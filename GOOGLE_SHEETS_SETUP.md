# Google Sheets API Setup Instructions

## Step 1: Google Developer Console Setup

1. Go to [Google Developer Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API:
   - Go to "APIs & Services" → "Enable APIs and services"
   - Search for "Google Sheets API" and enable it

## Step 2: Create Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "Create credentials" → "Service account"
3. Fill in service account details:
   - Service account name: Choose a name (e.g., "margin-dca-service")
   - Role: Basic → Editor
4. Click "Done"

## Step 3: Generate Credentials

1. Click on the service account you just created
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key" → "JSON"
4. Download the JSON file and rename it to `credentials.json`
5. Place the file in `src/config/credentials.json` (replace the placeholder)

## Step 4: Share Google Sheet

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1geJnsy0_-iLUAw_O7JJdV5VBNAQJdcq8kSrBZ0oKlaI/edit?usp=sharing
2. Click "Share" button
3. Paste the service account email (from credentials.json) and give it "Editor" access

## Step 5: Get Sheet ID

Your sheet ID is: `1geJnsy0_-iLUAw_O7JJdV5VBNAQJdcq8kSrBZ0oKlaI`

## Step 6: Update Your Code

The service is already set up in `src/services/googleSheetsService.ts`. You just need to:

1. Replace the placeholder credentials with your actual credentials file
2. Use the service in your components to fetch margin load parameters

## Usage Example

```typescript
import { createGoogleSheetsService } from '../services/googleSheetsService';

const sheetId = '1geJnsy0_-iLUAw_O7JJdV5VBNAQJdcq8kSrBZ0oKlaI';
const sheetsService = createGoogleSheetsService(sheetId);

await sheetsService.authenticate();
const marginParams = await sheetsService.getMarginLoadParameters();
console.log('Margin Load Parameters:', marginParams);
```

## Troubleshooting

- **CORS Issues**: Make sure you're running the app on a proper server (not file://)
- **Authentication Errors**: Double-check your credentials.json file and sharing permissions
- **API Quotas**: Google has free quotas, but monitor usage if you exceed limits

## Security Note

Never commit your `credentials.json` file to version control. Add it to `.gitignore`.
