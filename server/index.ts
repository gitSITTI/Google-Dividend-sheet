import express from 'express';
import cors from 'cors';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import fs from 'fs';
import path from 'path';

// Load credentials from path specified by env var to avoid JSON import parsing issues
function loadCredentials() {
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS_PATH || path.join(__dirname, '..', 'src', 'config', 'credentials.json');
  if (!fs.existsSync(credPath)) {
    throw new Error(`Credentials file not found at ${credPath}. Set GOOGLE_APPLICATION_CREDENTIALS_PATH env var or place the file there.`);
  }
  const raw = fs.readFileSync(credPath, 'utf8');
  return JSON.parse(raw);
}

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const SHEET_ID = '1geJnsy0_-iLUAw_O7JJdV5VBNAQJdcq8kSrBZ0oKlaI';

async function getDoc() {
  // google-spreadsheet typings in this environment expect an auth parameter
  // pass minimal auth info in constructor and call loadInfo()
  const credentials = loadCredentials();
  const auth = {
    client_email: (credentials as any).client_email,
    private_key: (credentials as any).private_key,
  } as any;

  const doc = new GoogleSpreadsheet(SHEET_ID, auth);
  await doc.loadInfo();
  return doc;
}

app.get('/api/margin-params', async (req, res) => {
  try {
    const doc = await getDoc();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const marginLoadData: any = {};
    rows.forEach((row: any) => {
      const rowData = row._rawData;
      const firstCell = rowData[0]?.toString().toLowerCase() || '';
      if (firstCell.includes('margin load start') || firstCell.includes('load start')) {
        marginLoadData.startDate = rowData[1];
      }
      if (firstCell.includes('margin load end') || firstCell.includes('load end')) {
        marginLoadData.endDate = rowData[1];
      }
      if (firstCell.includes('margin rate') || firstCell.includes('interest rate')) {
        marginLoadData.marginRate = parseFloat(rowData[1]) || 0;
      }
      if (firstCell.includes('maintenance margin')) {
        marginLoadData.maintenanceMargin = parseFloat(rowData[1]) || 0;
      }
    });

    res.json(marginLoadData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load margin parameters' });
  }
});

app.get('/api/all-data', async (req, res) => {
  try {
    const doc = await getDoc();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const data = rows.map((row: any) => ({ rawData: row._rawData, ...row }));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load sheet data' });
  }
});

// Simple health endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Startup watchdog: if server not healthy within 60 seconds, exit
let serverStarted = false;
const watchdogMs = 60 * 1000; // 60 seconds
const watchdog = setTimeout(() => {
  if (!serverStarted) {
    console.error(`Server failed to start within ${watchdogMs / 1000}s; shutting down.`);
    process.exit(1);
  }
}, watchdogMs);

const server = app.listen(PORT, () => {
  serverStarted = true;
  clearTimeout(watchdog);
  console.log(`Backend API listening on http://localhost:${PORT}`);
});

// Graceful shutdown on signals
process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down server.');
  server.close(() => process.exit(0));
});
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down server.');
  server.close(() => process.exit(0));
});
