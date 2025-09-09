import { useState, useEffect } from 'react';
import { createGoogleSheetsService } from '../services/googleSheetsService';

const SHEET_ID = '1geJnsy0_-iLUAw_O7JJdV5VBNAQJdcq8kSrBZ0oKlaI';

export interface MarginLoadParameters {
  startDate?: string;
  endDate?: string;
  marginRate?: number;
  maintenanceMargin?: number;
  [key: string]: any;
}

export const useGoogleSheets = () => {
  const [marginParams, setMarginParams] = useState<MarginLoadParameters>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMarginParameters = async () => {
    setLoading(true);
    setError(null);

    try {
      const sheetsService = createGoogleSheetsService(SHEET_ID);
      await sheetsService.authenticate();
      const params = await sheetsService.getMarginLoadParameters();
      setMarginParams(params);
    } catch (err) {
      console.error('Error fetching margin parameters:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch margin parameters');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);

    try {
      const sheetsService = createGoogleSheetsService(SHEET_ID);
      await sheetsService.authenticate();
      const data = await sheetsService.getAllSheetData();
      return data;
    } catch (err) {
      console.error('Error fetching sheet data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch sheet data');
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarginParameters();
  }, []);

  return {
    marginParams,
    loading,
    error,
    refetch: fetchMarginParameters,
    fetchAllData
  };
};
