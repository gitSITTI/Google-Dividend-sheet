# Margin-DCA Dashboard

A comprehensive React dashboard for margin-based Dollar Cost Averaging (DCA) portfolio management with live market data integration, financial simulation capabilities, and advanced income planning features inspired by Google Sheets financial models.

## Features

- **Portfolio Management**: Edit holdings, shares, and cost basis
- **Live Market Data**: Fetch real-time prices and dividend yields from Yahoo Finance
- **Financial Simulation**: Simulate margin trading scenarios with configurable parameters
- **Advanced Income Planning**: Goal tracking and progress monitoring inspired by [Google Sheets financial models](https://docs.google.com/spreadsheets/d/1geJnsy0_-iLUAw_O7JJdV5VBNAQJdcq8kSrBZ0oKlaI/edit?usp=sharing)
- **Risk Analysis**: Track maintenance coverage, liquidation risk, and margin requirements
- **Data Visualization**: Interactive charts showing equity, loans, coverage, and cashflows
- **Export Capabilities**: Download simulation data as CSV files
- **Responsive Design**: Modern UI with Tailwind CSS

### 🆕 Advanced Planning Features

- **Blended Yield Calculation**: Weighted average yield across portfolio
- **Income Goal Tracking**: Weekly, monthly, and annual dividend income goals
- **Margin Utilization**: Real-time margin usage vs. maximum capacity
- **Safe Margin Buffer**: Additional borrowing capacity within safe limits
- **Goal Progress Monitoring**: Visual progress bars and percentage completion
- **Advanced Parameters**: Configurable planning parameters from Google Sheets model

### 📊 New Weekly Analysis Features

- **Weekly Cashflow Table**: Detailed weekly breakdown of all financial metrics
- **Yearly Margin Rate**: Configurable yearly margin rate that converts to weekly calculations
- **Weekly Interest Calculations**: Interest computed using yearly rate ÷ 52 weeks
- **Weekly Dividend Distribution**: Dividends calculated on weekly basis (annual yield ÷ 52)
- **Weekly Risk Assessment**: Real-time risk classification updated weekly
- **Flexible Time Windows**: View last 12, 24, 48, 96, or all weeks of data

### 🎯 New Live Data & Excel Export Features

- **Live Dividend Frequency Detection**: Automatically detects if stocks pay weekly, monthly, quarterly, or annual dividends
- **Enhanced Live Quotes**: Fetches dividend history, ex-dividend dates, and payment schedules
- **Dividend Schedule Table**: Shows last dividend, next dividend, and ex-dividend dates for each holding
- **Excel Export**: Comprehensive time-series data export with multiple time frames
- **Multi-Timeframe Data**: Minute, hour, daily, weekly, and monthly data for detailed analysis
- **Volume Tracking**: Simulated trading volume data for market analysis
- **Excel Integration**: Data structured for easy import into Excel with separate sheets for each time frame

### 🔧 Enhanced Financial Calculations

- **Improved Blended Yield**: Now includes both dividend yield AND capital appreciation (price growth)
- **Margin Debit Frequency**: Choose when margin interest is debited (weekly, bi-weekly, monthly, yearly)
- **Separate Yield Breakdown**: View dividend yield and capital gains separately in KPIs and charts
- **Fixed CORS Issues**: Updated proxy service for reliable live market data fetching

### 🎯 Real vs Synthetic Data Control

- **Real Market Data Toggle**: Switch between real market prices and synthetic data for simulation
- **Accurate Dividend Calculations**: Fixed unrealistic dividend yields (76%, 148%) to realistic values (3-8%)
- **Live Price Integration**: Use actual market prices for more accurate financial projections
- **Data Source Transparency**: Clear indicators showing whether real or synthetic data is being used

## Key Components

### Portfolio Editor
- Add/remove holdings with symbol, shares, and cost per share
- Live price updates from Yahoo Finance API
- Dividend yield tracking
- CORS proxy support for API calls

### Simulation Parameters
- Maintenance margin percentage
- Margin APR (Annual Percentage Rate)
- Contribution amount and schedule (Weekly/Biweekly/Monthly)
- DRIP (Dividend Reinvestment Plan) option
- Quarterly withdrawal percentage

### Charts & Analytics
- **Equity vs Market Value vs Loan**: Track portfolio growth over time
- **Weekly Debt Service**: Dividend allocation vs interest payments
- **Coverage Analysis**: Maintenance margin coverage with risk thresholds
- **ROI Tracking**: Equity growth vs cumulative contributions

### Risk Management
- Real-time risk classification (LOW/MEDIUM/HIGH)
- Liquidation headroom calculations
- Maintenance buffer monitoring
- Coverage percentage tracking

## Installation

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Usage

### Setting Up Your Portfolio
1. Edit the default holdings in the Portfolio section
2. Add your stock symbols, shares, and cost basis
3. Click "Refresh Quotes" to get live market data
4. Adjust the CORS proxy settings if needed

### Configuring Simulation
1. Set your maintenance margin percentage (typically 30%)
2. Enter your broker's margin APR
3. Choose contribution amount and frequency
4. Enable DRIP if you want dividend reinvestment
5. Set quarterly withdrawal percentage for margin cash-outs

### Analyzing Results
- Review the KPI cards for key metrics
- Examine charts for trends and patterns
- Check the monthly cashflow and finance tables
- Export data for further analysis
- **NEW**: Export comprehensive time-series data to Excel
- **NEW**: Analyze dividend schedules and payment frequencies

## Technical Details

### Dependencies
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Recharts**: Interactive data visualization
- **Lucide React**: Modern icon library
- **Tailwind CSS**: Utility-first styling
- **Vite**: Fast build tool and dev server

### API Integration
- Yahoo Finance API for live market data
- Optional CORS proxy support
- Error handling and fallback data

### Simulation Logic
- Equal-weight portfolio allocation
- Monthly dividend calculations
- Interest accrual and payment
- Margin withdrawal mechanics
- Risk assessment algorithms

## File Structure

```
├── src/
│   ├── main.tsx          # React entry point
│   ├── App.tsx           # Main app component
│   └── index.css         # Global styles
├── MarginDCADashboard.tsx # Main dashboard component
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── index.html            # HTML template
```

## Customization

### Adding New Tickers
Edit the `DEFAULT_TICKERS` array in `MarginDCADashboard.tsx` to include your preferred stocks with their annual dividend yields.

### Modifying Simulation Logic
The core simulation logic is in the `simulate()` function. You can adjust:
- Contribution allocation strategies
- Dividend reinvestment logic
- Interest calculation methods
- Risk assessment criteria

### Styling
The component uses Tailwind CSS classes. You can customize the appearance by modifying the className attributes or updating the Tailwind configuration.

## Troubleshooting

### CORS Issues
If you encounter CORS errors when fetching market data:
1. Enable the "Use CORS proxy" option
2. Try different proxy servers
3. Use a browser extension to disable CORS (development only)

### API Rate Limits
Yahoo Finance may have rate limits. If you encounter issues:
1. Reduce the frequency of quote refreshes
2. Use mock data for testing
3. Implement caching for repeated requests

## License

MIT License - feel free to use and modify for your needs.
