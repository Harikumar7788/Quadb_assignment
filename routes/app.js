const express = require('express');
const { open } = require('sqlite');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const path = require('path');
const axios = require('axios');

const app = express();
app.use(cors());
const dbPath = path.join(__dirname, 'Hodlinedatabase.db');
let db = null;
const PORT = 3000;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await db.run(`
      CREATE TABLE IF NOT EXISTS tickers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        last REAL NOT NULL,
        buy REAL NOT NULL,
        sell REAL NOT NULL,
        volume REAL NOT NULL,
        base_unit TEXT NOT NULL
      )
    `);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    
    fetchAndUpdateData();  
    setInterval(fetchAndUpdateData, 300000); 
  } catch (e) {
    console.error(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();


const fetchAndUpdateData = async () => {
  try {
    console.log('Fetching data from WazirX API...');
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = Object.values(response.data).slice(0, 10);  


    await db.run('DELETE FROM tickers');


    const insertQuery = `
      INSERT INTO tickers (name, last, buy, sell, volume, base_unit)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    
    const insertPromises = tickers.map(ticker => {
      return db.run(insertQuery, [
        ticker.name,
        parseFloat(ticker.last),  
        parseFloat(ticker.buy),
        parseFloat(ticker.sell),
        parseFloat(ticker.volume),
        ticker.base_unit
      ]);
    });

    await Promise.all(insertPromises);
    console.log('Database updated with new data.');
  } catch (error) {
    console.error('Error fetching or updating data:', error.message);
  }
};


app.get('/get-tickers', async (req, res) => {
  try {
    const tickers = await db.all('SELECT * FROM tickers');
    res.json(tickers);
  } catch (error) {
    console.error('Error retrieving data:', error.message);
    res.status(500).send('Error retrieving data.');
  }
});
