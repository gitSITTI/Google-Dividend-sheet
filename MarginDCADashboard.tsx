import React, { useState, useEffect } from 'react';
import { useGoogleSheets } from './src/hooks/useGoogleSheets';
import { Loader2, RefreshCw, Calendar, DollarSign } from 'lucide-react';

interface PortfolioHolding {
  symbol: string;
  shares: number;
  costBasis: number;
  currentPrice?: number;
  dividendYield?: number;
}

interface SimulationParams {
  maintenanceMargin: number;
  marginAPR: number;
  contributionAmount: number;
  contributionFrequency: 'weekly' | 'biweekly' | 'monthly';
  drrip: boolean;
  quarterlyWithdrawal: number;
}

const MarginDCADashboard: React.FC = () => {
  const { marginParams, loading, error, refetch } = useGoogleSheets();

  const [holdings] = useState<PortfolioHolding[]>([
    { symbol: 'COIW', shares: 1000, costBasis: 25.00 },
    { symbol: 'PFE', shares: 500, costBasis: 35.00 },
    { symbol: 'JNJ', shares: 200, costBasis: 150.00 }
  ]);

  const [simulationParams, setSimulationParams] = useState<SimulationParams>({
    maintenanceMargin: 30,
    marginAPR: 12,
    contributionAmount: 1000,
    contributionFrequency: 'monthly',
    drrip: true,
    quarterlyWithdrawal: 10
  });

  // Update simulation parameters when Google Sheets data is loaded
  useEffect(() => {
    if (marginParams && Object.keys(marginParams).length > 0) {
      setSimulationParams(prev => ({
        ...prev,
        maintenanceMargin: marginParams.maintenanceMargin || prev.maintenanceMargin,
        marginAPR: marginParams.marginRate ? marginParams.marginRate * 100 : prev.marginAPR
      }));
    }
  }, [marginParams]);

  const handleRefreshData = async () => {
    await refetch();
  };

  const handleRunSimulation = () => {
    // Placeholder for simulation logic
    console.log('Running simulation with params:', simulationParams);
    console.log('Margin load parameters from Google Sheets:', marginParams);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Margin-DCA Dashboard
          </h1>
          <p className="text-gray-600">
            Financial simulation with live Google Sheets integration
          </p>
        </div>

        {/* Google Sheets Status */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Google Sheets Integration
            </h2>
            <div className="mb-4">
              {loading && (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading margin parameters...</span>
                </div>
              )}

              {error && (
                <div className="border border-red-200 bg-red-50 p-4 rounded">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              {marginParams && Object.keys(marginParams).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Load Start</p>
                      <p className="text-sm text-gray-600">{formatDate(marginParams.startDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Load End</p>
                      <p className="text-sm text-gray-600">{formatDate(marginParams.endDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium">Margin Rate</p>
                      <p className="text-sm text-gray-600">
                        {marginParams.marginRate ? `${(marginParams.marginRate * 100).toFixed(2)}%` : 'Not specified'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium">Maintenance</p>
                      <p className="text-sm text-gray-600">
                        {marginParams.maintenanceMargin ? `${marginParams.maintenanceMargin}%` : 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <button
                  onClick={handleRefreshData}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  Refresh from Google Sheets
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation Parameters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Simulation Parameters</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="maintenance-margin" className="block text-sm font-medium mb-1">Maintenance Margin (%)</label>
                <input
                  id="maintenance-margin"
                  type="number"
                  value={simulationParams.maintenanceMargin}
                  onChange={(e) => setSimulationParams(prev => ({
                    ...prev,
                    maintenanceMargin: parseFloat(e.target.value) || 0
                  }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label htmlFor="margin-apr" className="block text-sm font-medium mb-1">Margin APR (%)</label>
                <input
                  id="margin-apr"
                  type="number"
                  value={simulationParams.marginAPR}
                  onChange={(e) => setSimulationParams(prev => ({
                    ...prev,
                    marginAPR: parseFloat(e.target.value) || 0
                  }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label htmlFor="contribution-amount" className="block text-sm font-medium mb-1">Contribution Amount ($)</label>
                <input
                  id="contribution-amount"
                  type="number"
                  value={simulationParams.contributionAmount}
                  onChange={(e) => setSimulationParams(prev => ({
                    ...prev,
                    contributionAmount: parseFloat(e.target.value) || 0
                  }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label htmlFor="contribution-frequency" className="block text-sm font-medium mb-1">Contribution Frequency</label>
                <select
                  id="contribution-frequency"
                  className="w-full p-2 border rounded"
                  value={simulationParams.contributionFrequency}
                  onChange={(e) => setSimulationParams(prev => ({
                    ...prev,
                    contributionFrequency: e.target.value as any
                  }))}
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Portfolio Holdings</h2>
            <div className="space-y-2">
              {holdings.map((holding, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{holding.symbol}</p>
                    <p className="text-sm text-gray-600">{holding.shares} shares @ ${holding.costBasis}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(holding.shares * holding.costBasis).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button onClick={handleRunSimulation} className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700">
            Run Simulation
          </button>
          <button onClick={handleRefreshData} className="bg-gray-600 text-white px-8 py-2 rounded hover:bg-gray-700">
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarginDCADashboard;
