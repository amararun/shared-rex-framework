## Getting Started
- **API Key**: An API key is required for real-time chat. You can obtain one from the OpenAI site.  
***https://platform.openai.com/settings/organization/api-keys***  

- Note: There is a $5 minimum recharge. The conversation costs around $1 per minute.

- **Free Tools**: Other agents don't need your API keys and are free to use (with rate limits).

- **Video Guide**: How to Build and Deploy Realtime API Analytics Assistant Agent System. Connected to Data Warehouse. YouTube link below. 90-minute video, with the first 15 minutes being a demo of the system.  
***https://youtu.be/99aD2tv8G-0***  
Short 3-minute snippets on LinkedIn post below.  
Meet REX-1: Your Real-Time AI Analytics Agent System (Web Version).  
***https://link.tigzig.com/rex1***  


## Features

### 1. Text-to-SQL (MySQL Data Warehouse Integration)
- **Function**: Query live data warehouses (AWS RDS or Azure MySQL) using natural language.
- **Setup**: Requires your database credentials to connect. *Currently connected to a test warehouse, temporarily disabled.*
- **Video Guide**: LinkedIn Post and short 3 minute snippets below.  
GenAI App | LLM Analytics Assistant: Simplifying Data Transformation & Insights. AWS & Azure MySQL DW  
***https://link.tigzig.com/anlzrDemo***  
Full 20 minute video below on YouTube  
***https://www.youtube.com/watch?v=QJTyjdEnP4w***  
 
- **Examples**:
  - "Can you pull up the record for Customer ID 12345?"

  - "Can you show me response rate distribution by Education and Housing variables?"

  - "Age is a continuous variable ranging from 20 to 70. Can you show me the response rate by age bucket in 10-year increments, e.g., 20-30, 30-40, etc.?"

  - "How many customers in the age group of 30-40 and with house ownership of 1? For these customers, can you show me the response rate by education?"

  - "Create a new table called temp_trans_summ that summarizes transactions by customer ID. For each customer, calculate the total amount and count of transactions for cash sales (where tc code is 1001) and retail sales (where tc code is 1002). Label these as CASH_SALES_AMT, CASH_SALES_NUM, RETAIL_SALES_AMT, and RETAIL_SALES_NUM. Also, add a CASH_SALES_TAG field that’s set to 1 if there's at least one cash sale, and similarly, add a RETAIL_SALES_TAG field for retail sales. Then, create fields for TOTAL_SALES_AMT and TOTAL_SALES_NUM as the combined sum of both cash and retail sales amounts and counts. Finally, calculate the average transaction values for cash, retail, and total sales by dividing the amount by the transaction count for each type, and label these as CASH_SALES_ATV, RETAIL_SALES_ATV, and TOTAL_SALES_ATV."

### 2. Yahoo Finance & Equities Data
- **Function**: Access financial data such as income statements, stock prices, and balance sheets from Yahoo Finance.
- **Details**: Uses Python's `yfinance` package to fetch stock prices for a given time range, latest market capitalization, income statements, balance sheets, cash flow statements, and quarterly financials. You can share the Yahoo Finance symbol for stocks or request the agent to find it.

- **Examples**:
  - "Get Apple's income statement, cash flows, and latest quarterlies."

  - "Can you share a side-by-side comparison of the latest quarterlies of Apple, Google, and Microsoft? Major line items only."

  - See Python Charts section for more examples, including technical analysis charts.

### 3. Python, Statistical Analysis & Charts
- **Function**: Perform statistical analysis, data transformations, and create charts using Python.

- **How to Use**: Run statistical analysis or get charts for your data. The data can be from a connected data warehouse, financial data from Yahoo Finance, or data uploaded by you (if file upload is enabled).

- **Examples**:
  - "Can you show me a bar chart for response rates by housing and education? Also, add the number of customers and responses on a secondary axis."

  - "Can you run a hypothesis test? I want to see if the response rates by age buckets 10-20 and 20-30 are statistically different. Also, share a normal distribution plot for the same."

  - "Can you create a scatter plot for the relationship between age and response rate?"

  - "Can you create a relative price performance chart for a few indices? I need it for Nifty 50, FTSE 100, and S&P 500 for the period 1st Jan 2024 to 31st Jan 2024. I don't have the Yahoo Finance symbol handy, so please find it."

  - "I need a technical analysis chart for Nifty 50 for the period 1st Jan 2024 to 31st Mar 2024. Show a candlestick chart with a 20-day moving average and 20-day Bollinger Bands. I don't have the Yahoo Finance symbol handy, so please find it."

### 4. Web Scraping
- **Function**: Extract specified data from web pages for the URLs shared, and present results in the required format (Table, Paragraph, Summary, etc.).
- **Details**: Uses a backend tool (Jina.ai) to extract content in text/markdown format. Based on user instructions, the LLM can format the data as needed.

- **Examples**:
  - "From the URL below, can you share a list of current United States senators? Include their names, party, date of birth, place of birth, and individual page URLs in table format. Share the first 10 only.  
  ***https://en.wikipedia.org/wiki/List_of_current_United_States_senators***  

### 5. Custom Web Search
- **Function**: Conduct targeted searches via Google.
- **Examples**:
  - "Find the latest five research papers from arXiv on generative AI applications in analytics and data science, with a few lines on each."

- **How It Works**: The agent filters and formats search results based on your criteria, sharing URLs as needed.

### 6. Document Updater (Google Docs Integration)
- **Function**: Export data directly into Google Docs. View it in the document pane by clicking on the Google Docs link.

- **Examples**:
  - "Push these search results into Google Docs."
  - "Compile this analysis and save it to Google Docs."

### 7. Tracker Updater
- **Function**: Update trackers in Excel, Google Sheets, and SQL databases. Emails PDF reports and deck format to a pre-configured email address. You can view the tracker in the document pane by clicking on the Excel and Google Sheets links. Emailing is currently configured to a personal email address. If required, functionality can be added to send to a user-specified email instead of the hard-coded one.

- **Examples**:
  - "Update the tracker with a new tool, FlowWise AI, a UI-based LLM development platform."
  - "Can you send me the tracker in PDF format?"
  - "Can you send me the tracker in deck format?"
