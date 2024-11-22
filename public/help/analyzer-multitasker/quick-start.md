## Getting Started with Analyzer Multitasker

The Analyzer AI is a powerful tool that allows you to analyze data across multiple sources simultaneously.

### How to Use

**Sample files on my google drive below.**
   Samples files for quick start. RBI Cards / ATM / POS live data, which are small datasets but rich in data, providing many complex transformations and statistical analyses. Other examples are mock datasets of customer profiles with response rates and other variables, with file sizes ranging from 100K rows (around 10MB) to 10M rows (around 1.2GB). 
   [https://drive.google.com/drive/folders/1QlE8tJDKAX9XaHUCabfflPgRnNiOXigV](https://drive.google.com/drive/folders/1QlE8tJDKAX9XaHUCabfflPgRnNiOXigV)

1. Quick key to buttons and Tabs  
   **Buttons**
   - **BYOW - Connect**: To connect to your own warehouse by providing credentials
   - **Choose File**: To upload your CSV / TXT file
   - **Table**: Load the uploaded CSV / TXT file into an interactive table
   - **Structure**: Send sample rows to AI to understand the structure of the file
   - **Analysis**: Send 100 rows to AI for analysis
   - **Push-REX-DB**: Push the data to the REX connected warehouse
   - **Send to AI**: Shares the table details of file pushed to REX-DB and sample records with AI for further analysis
   - **Push-My DB**: Push your CSV / TXT file to your own warehouse as per credentials provided in BYOW-Connect button

   **Tabs**
   - **AI Data Structure Analysis**: AI interprets the structure of the file based on 10 row sample data. **Generate PDF** button generates a PDF of the analysis.
   - **AI Data Analysis**: AI analyzes the data. **Generate PDF** button generates a PDF of the analysis.
   - **Chat with AI**: Chat with AI for further analysis of the data pushed to REX-DB as well as tables in your warehouse including your uploaded files.



2. **BYOW (Bring Your Own Warehouse)**
   - Connect to your data warehouse on the fly
   - Supports MySQL and PostgreSQL
   - Analyze any existing data in your warehouse
   - Click on the Connect Button. Just dump your credentials in the box and click on connect.
   - To Upload CSV / Text File - Connect as above. Then Upload the file and click on the last button that says Push-My DB. See note below on file size for text file upload.
   - **Table Sizes**: There are no restrictions in the app on table sizes, query processing, and data transformation as all operations occur on the warehouse side. The app sends the final query to the warehouse, where it is executed. This means that the warehouse could have thousands of tables with petabytes of data.


3. **Natural Language-to-SQL: Querying and Analyzing Data**
   - Video Guide: LinkedIn Post and short 3 minute snippets below.  
     GenAI App | LLM Analytics Assistant: Simplifying Data Transformation & Insights. AWS & Azure MySQL DW  
     [https://link.tigzig.com/anlzrDemo](https://link.tigzig.com/anlzrDemo)  
     Full 20 minute video below on YouTube:  
     [https://www.youtube.com/watch?v=QJTyjdEnP4w](https://www.youtube.com/watch?v=QJTyjdEnP4w)

   **Examples**:
   - "Can you pull up the record for Customer ID 12345?"
   - "Can you show me response rate distribution by Education and Housing variables?"
   - "Age is a continuous variable ranging from 20 to 70. Can you show me the response rate by age bucket in 10-year increments, e.g., 20-30, 30-40, etc.?"
   - "How many customers in the age group of 30-40 and with house ownership of 1? For these customers, can you show me the response rate by education?"
   - "Create a new table called `temp_trans_summ` that summarizes transactions by customer ID. For each customer, calculate the total amount and count of transactions for cash sales (where tc code is 1001) and retail sales (where tc code is 1002). Label these as `CASH_SALES_AMT`, `CASH_SALES_NUM`, `RETAIL_SALES_AMT`, and `RETAIL_SALES_NUM`. Also, add a `CASH_SALES_TAG` field that’s set to 1 if there's at least one cash sale, and similarly, add a `RETAIL_SALES_TAG` field for retail sales. Then, create fields for `TOTAL_SALES_AMT` and `TOTAL_SALES_NUM` as the combined sum of both cash and retail sales amounts and counts. Finally, calculate the average transaction values for cash, retail, and total sales by dividing the amount by the transaction count for each type, and label these as `CASH_SALES_ATV`, `RETAIL_SALES_ATV`, and `TOTAL_SALES_ATV`."

4. **Interactive Tables**
   - Click on the **'Tables'** tab to load the uploaded CSV / TXT file into an interactive table.
   - The table is interactive. You can sort, filter, and search the data.
   - Clicking on the calculator icon for the row pulls up the row details popup
   - Clicking on the calculator icon for the column opens up the **Statistics** tab with metrics for central tendency, dispersion, and shape of the distribution, etc.
5. **Analyze TXT / CSV Files**
   - Upload TXT / CSV files
   - Supports pipe-delimited and comma-delimited files
   - **'Structure'** button: Sends sample rows to AI to understand the structure of the file.
   - **'Analysis'** button: Sends 100 rows to AI for analysis. This is a text-based analysis. For deeper analysis, you can use the **Push-REX-DB / Push-My-DB** and then use the **Chat with AI** tab for a more detailed analysis using the natural language to SQL feature.
   - **File Sizes**: 
     - I have tested with files up to 600 MB with 5M rows and was successfully able to upload to my Aiven warehouse. That took around 3 minutes for PostgreSql which uses the COPY command for rapid data upload. The app has a limit of 1.5GB, which you can customize. Other than that, the app itself has no restrictions, but I encountered some file size issues on 1GB and higher file size uploads.
     - The interactive table function also depends on your machine, as some features may not work for larger files. For instance, at a 10MB file size, all interactive features work well. At 1M rows, the interactive table row details and filtering work well, but the statistical functions do not. At 600MB, the table does not load, though you can still push that data to your warehouse.
   - **Sample Files**: Examples include RBI Cards / ATM / POS live data, which are small datasets but rich in data, providing many complex transformations and statistical analyses. Other examples are mock datasets of customer profiles with response rates and other variables, with file sizes ranging from 100K rows (around 10MB) to 10M rows (around 600MB).  Feel free to test them out. Sample files on my google drive below.
     [https://drive.google.com/drive/folders/1QlE8tJDKAX9XaHUCabfflPgRnNiOXigV](https://drive.google.com/drive/folders/1QlE8tJDKAX9XaHUCabfflPgRnNiOXigV)

6. **Push TXT / CSV to Warehouse**
   - **'Push-REX-DB'** button: Pushes the data to the REX connected warehouse.
   - **'Send to AI'** button: Shares the table details and sample records with AI for further analysis. You can then go to the **"Chat with AI"** tab and query your data. The AI Agent converts your text to SQL and runs it on the updated data. It also has the ability to run Python code for charts and statistical analysis.
   - Please note that schema is not sent automatically if a text file is uploaded to your own warehouse. In this scenario, when you chat with AI, you can start with AI showing you, say, 2 sample records. With that, the AI will understand your data and you can start your queries.

### Python, Statistical Analysis & Charts  
   **Function**: Perform statistical analysis, data transformations, and create charts using Python.

   **How to Use**: Run statistical analysis or get charts for your data. The data can be from a connected data warehouse, financial data from Yahoo Finance, or data uploaded by you (if file upload is enabled).

   **Examples**:
   - "Can you show me a bar chart for response rates by housing and education? Also, add the number of customers and responses on a secondary axis."
   - "Can you run a hypothesis test? I want to see if the response rates by age buckets 10-20 and 20-30 are statistically different. Also, share a normal distribution plot for the same."
   - "Can you create a scatter plot for the relationship between age and response rate?"
   - "Can you create a relative price performance chart for a few indices? I need it for Nifty 50, FTSE 100, and S&P 500 for the period 1st Jan 2024 to 31st Jan 2024. I don't have the Yahoo Finance symbol handy, so please find it."
   - "I need a technical analysis chart for Nifty 50 for the period 1st Jan 2024 to 31st Mar 2024. Show a candlestick chart with a 20-day moving average and 20-day Bollinger Bands. I don't have the Yahoo Finance symbol handy, so please find it."
