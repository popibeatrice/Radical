const express = require('express');
const path = require('path');
const vremeRout = require('./routes/vreme');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 6060;

app.use(express.static(path.join(__dirname, '../Front-end/public')));
app.use(express.json());
app.use('/vreme', vremeRout);

app.get('/en', async (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../Front-end/public/indexEn.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
