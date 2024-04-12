const express = require('express');
const app = express();
const port = 3000;
const db = require('./database.js')
const cors = require('cors')

app.use(cors())
app.use(express.json())

require('dotenv').config()

process.on("SIGINT", () => {
    db.closePool()
    process.exit()
    }
);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/areas', db.addArea)
app.get('/areas', db.getAreas)
app.get('/areas/:id/apartments', db.getApartmentsInArea)