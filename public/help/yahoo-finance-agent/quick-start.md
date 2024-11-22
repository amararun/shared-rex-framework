This Agent can access financial data from Yahoo Finance and perform statistical analysis and create charts.

### Yahoo Finance & Equities Data
- **Function**: Access financial data such as income statements, stock prices, and balance sheets from Yahoo Finance.
- **Details**: Uses Python's `yfinance` package to fetch stock prices for a given time range, latest market capitalization, income statements, balance sheets, cash flow statements, and quarterly financials. You can share the Yahoo Finance symbol for stocks or request the agent to find it.

- **Examples**:
  - "Get Apple's income statement, cash flows, and latest quarterlies."

  - "Can you share a side-by-side comparison of the latest quarterlies of Apple, Google, and Microsoft? Major line items only."

  - See Python Charts section for more examples, including technical analysis charts.

### Python, Statistical Analysis & Charts
- **Function**: Perform statistical analysis, data transformations, and create charts using Python for the data fetched from Yahoo Finance

- **Examples**:

  - "Can you create a relative price performance chart for a few indices? I need it for Nifty 50, FTSE 100, and S&P 500 for the period 1st Jan 2024 to 31st Jan 2024. I don't have the Yahoo Finance symbol handy, so please find it."

  - "I need a technical analysis chart for Nifty 50 for the period 1st Jan 2024 to 31st Mar 2024. Show a candlestick chart with a 20-day moving average and 20-day Bollinger Bands. I don't have the Yahoo Finance symbol handy, so please find it."