const express = require('express');
const app = express();
const port = 3000;
const db = require('./database.js')
const cors = require('cors')
const auth = require('./login.js')
const cookieParser = require('cookie-parser');

app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:5173', // Change this to match your frontend's origin
  credentials: true, // This allows cookies to be sent with the request
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions))
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
app.get('/validateToken', (req, res) => db.validateTokenAndReturnUserId(req.cookies.session_token, res))
app.get('/users/:id', db.getUserNameById);


app.post('/login', auth.login)
app.post('/logout', auth.logout)