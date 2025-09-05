# Excel Data Structure for Margin-DCA Dashboard

## Overview
The dashboard exports comprehensive time-series data that can be imported into Excel for detailed analysis. The data is organized into multiple time frames for different analysis needs.

## Export Format
The data is exported as a CSV file with multiple sections, each representing a different time frame:

### File Structure
```
=== Minute_Data ===
Timestamp,Symbol,Price,Volume,DividendAmount,ExDividendDate,TimeFrame
2024-01-01T09:30:00.000Z,COIW,45.23,1250000,,,MINUTE
2024-01-01T09:31:00.000Z,COIW,45.31,1180000,,,MINUTE
...

=== Hour_Data ===
Timestamp,Symbol,Price,Volume,DividendAmount,ExDividendDate,TimeFrame
2024-01-01T09:00:00.000Z,COIW,45.15,2500000,,,HOUR
2024-01-01T10:00:00.000Z,COIW,45.42,2100000,,,HOUR
...

=== Daily_Data ===
Timestamp,Symbol,Price,Volume,DividendAmount,ExDividendDate,TimeFrame
2024-01-01T00:00:00.000Z,COIW,45.15,15000000,,,DAILY
2024-01-02T00:00:00.000Z,COIW,45.67,12000000,,,DAILY
...

=== Weekly_Data ===
Timestamp,Symbol,Price,Volume,DividendAmount,ExDividendDate,TimeFrame
2024-01-01T00:00:00.000Z,COIW,45.15,75000000,0.15,,WEEKLY
2024-01-08T00:00:00.000Z,COIW,45.67,60000000,0.15,,WEEKLY
...

=== Monthly_Data ===
Timestamp,Symbol,Price,Volume,DividendAmount,ExDividendDate,TimeFrame
2024-01-01T00:00:00.000Z,COIW,45.15,300000000,0.60,,MONTHLY
2024-02-01T00:00:00.000Z,COIW,45.67,240000000,0.60,,MONTHLY
...
```

## Column Descriptions

### Core Data Columns
- **Timestamp**: ISO 8601 formatted date/time
- **Symbol**: Stock ticker symbol
- **Price**: Stock price at the time
- **Volume**: Trading volume
- **TimeFrame**: Data granularity (MINUTE, HOUR, DAILY, WEEKLY, MONTHLY)

### Dividend Columns
- **DividendAmount**: Dividend payment amount (if applicable)
- **ExDividendDate**: Ex-dividend date for the stock

## Time Frame Details

### 1. Minute Data
- **Frequency**: Every minute during market hours
- **Use Case**: Intraday analysis, high-frequency trading patterns
- **Data Points**: ~43,200 per month (30 days × 24 hours × 60 minutes)

### 2. Hour Data
- **Frequency**: Every hour
- **Use Case**: Daily patterns, market session analysis
- **Data Points**: ~720 per month (30 days × 24 hours)

### 3. Daily Data
- **Frequency**: End of each trading day
- **Use Case**: Daily performance analysis, trend identification
- **Data Points**: ~30 per month

### 4. Weekly Data
- **Frequency**: End of each week
- **Use Case**: Weekly performance, dividend tracking
- **Data Points**: ~4 per month

### 5. Monthly Data
- **Frequency**: End of each month
- **Use Case**: Long-term analysis, portfolio rebalancing
- **Data Points**: ~1 per month

## Dividend Integration

### Automatic Detection
The system automatically detects dividend frequency based on historical data:
- **WEEKLY**: Dividends paid every 7 days or less
- **MONTHLY**: Dividends paid every 30-35 days
- **QUARTERLY**: Dividends paid every 90-95 days
- **ANNUAL**: Dividends paid every 365+ days

### Dividend Amount Calculation
- **Weekly**: Annual yield ÷ 52
- **Monthly**: Annual yield ÷ 12
- **Quarterly**: Annual yield ÷ 4
- **Annual**: Full annual yield

## Excel Import Instructions

### Step 1: Import the CSV
1. Open Excel
2. Go to Data → Get Data → From Text/CSV
3. Select the exported CSV file
4. Choose "Delimited" and set delimiter to comma

### Step 2: Create Separate Sheets
1. Copy each time frame section to its own sheet
2. Name sheets: "Minute", "Hour", "Daily", "Weekly", "Monthly"
3. Remove the section headers (=== SheetName ===)

### Step 3: Format Data
1. Convert timestamp column to proper date format
2. Format price and volume columns as numbers
3. Create pivot tables for analysis

## Analysis Capabilities

### Price Analysis
- Moving averages across all time frames
- Volatility calculations
- Support/resistance levels
- Trend analysis

### Volume Analysis
- Volume patterns by time of day
- Volume spikes correlation with price movements
- Market session analysis

### Dividend Analysis
- Dividend payment tracking
- Yield calculations
- Ex-dividend date impact on price
- Income projection modeling

### Portfolio Analysis
- Correlation analysis between holdings
- Risk metrics calculation
- Performance attribution
- Rebalancing triggers

## Advanced Excel Features

### Pivot Tables
Create pivot tables to analyze:
- Price trends by symbol and time frame
- Volume patterns by hour/day
- Dividend payments by frequency

### Charts
Generate charts for:
- Price movement over time
- Volume distribution
- Dividend payment schedules
- Performance comparisons

### Formulas
Use Excel formulas for:
- Moving averages
- Volatility calculations
- Correlation coefficients
- Performance metrics

## Data Refresh
- Export new data from the dashboard
- Replace existing data in Excel
- Update charts and analysis automatically
- Maintain historical data for comparison

This structure provides comprehensive data for detailed financial analysis while maintaining compatibility with Excel's powerful analytical tools.

