const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./src/config/credentials.json');

// Your Google Sheet ID
const SHEET_ID = '1geJnsy0_-iLUAw_O7JJdV5VBNAQJdcq8kSrBZ0oKlaI';

async function testGoogleSheetsConnection() {
  try {
    console.log('Testing Google Sheets connection...');

    const doc = new GoogleSpreadsheet(SHEET_ID);

    // Authenticate
    await doc.useServiceAccountAuth(credentials);
    console.log('✅ Authentication successful');

    // Load document info
    await doc.loadInfo();
    console.log('✅ Document loaded:', doc.title);

    // Get first sheet
    const sheet = doc.sheetsByIndex[0];
    console.log('✅ First sheet:', sheet.title);
    console.log('✅ Row count:', sheet.rowCount);

    // Get some rows
    const rows = await sheet.getRows({ limit: 5 });
    console.log('✅ Retrieved', rows.length, 'rows');

    if (rows.length > 0) {
      console.log('First row data:', rows[0]._rawData);
    }

    // Look for margin load parameters
    console.log('\n🔍 Looking for margin load parameters...');
    rows.forEach((row, index) => {
      const rowData = row._rawData;
      if (rowData && rowData.length > 0) {
        const firstCell = rowData[0]?.toString().toLowerCase() || '';
        if (firstCell.includes('margin load') || firstCell.includes('load start') || firstCell.includes('load end')) {
          console.log(`Found parameter at row ${index + 1}:`, rowData);
        }
      }
    });

    console.log('\n🎉 Google Sheets integration test completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

// Run the test
testGoogleSheetsConnection();
