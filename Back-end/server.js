const connectDB = require('./db/connect');
const express = require('express');
const path = require('path');
const vremeRout = require('./routes/vreme');
const gptRout = require('./routes/gpt');
const sightsRout = require('./routes/sights');
const adminRout = require('./routes/admin');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 6060;

app.use(express.static(path.join(__dirname, '../Front-end/public')));
app.use(express.json({ limit: '30mb' }));

app.use('/vreme', vremeRout);
app.use('/gpt', gptRout);
app.use('/sights', sightsRout);
app.use('/admin', adminRout);

app.get('/en', async (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../Front-end/public/indexEn.html'));
});
app.get('/admin', async (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../Front-end/public/indexAdmin.html'));
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
