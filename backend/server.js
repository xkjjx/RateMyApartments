const express = require('express');
const app = express();
const port = 3000;
const db = require('./database.js')
const cors = require('cors')
const auth = require('./login.js')
const cookieParser = require('cookie-parser');

app.use(cookieParser());
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
app.get('/areas/:id/name', db.getAreaName)
app.get('/apartments/:id/info', db.getApartmentInformation)
app.post('/reviews', db.addReview)
app.get('/reviews/:id', db.getReviews)

app.post('/login', auth.login)
app.post('/logout', auth.logout)