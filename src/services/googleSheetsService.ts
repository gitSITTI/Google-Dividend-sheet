// Simplified version for browser compatibility
// In production, this should be replaced with a backend API

export class GoogleSheetsService {
  private sheetId: string;

  constructor(sheetId: string) {
    this.sheetId = sheetId;
  }

  async authenticate() {
    // For now, we'll simulate authentication
    // In production, this would call a backend API
    console.log('Google Sheets authentication simulated for sheet:', this.sheetId);
    return true;
  }

  async getMarginLoadParameters() {
    // Call backend API to get real margin parameters
    const res = await fetch('http://localhost:3001/api/margin-params');
    if (!res.ok) {
      throw new Error('Failed to fetch margin parameters from backend');
    }
    const data = await res.json();
    return data;
  }

  async getAllSheetData() {
    const res = await fetch('http://localhost:3001/api/all-data');
    if (!res.ok) {
      throw new Error('Failed to fetch sheet data from backend');
    }
    return await res.json();
  }
}

// Factory function to create service instance
export const createGoogleSheetsService = (sheetId: string) => {
  return new GoogleSheetsService(sheetId);
};
