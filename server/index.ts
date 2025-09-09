import express from 'express';
import cors from 'cors';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from '../src/config/credentials.json';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const SHEET_ID = '1geJnsy0_-iLUAw_O7JJdV5VBNAQJdcq8kSrBZ0oKlaI';

async function getDoc() {
  // google-spreadsheet typings in this environment expect an auth parameter
  // pass minimal auth info in constructor and call loadInfo()
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

app.listen(PORT, () => {
  console.log(`Backend API listening on http://localhost:${PORT}`);
});
