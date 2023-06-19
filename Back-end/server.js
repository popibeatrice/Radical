const connectDB = require('./db/connect');
const express = require('express');
const path = require('path');
const vremeRout = require('./routes/vreme');
const gptRout = require('./routes/gpt');
const sightsRout = require('./routes/sights');
const adminRout = require('./routes/admin');
const eventsRout = require('./routes/events');
const { deleteExpiredPosts } = require('./controllers/admin.js');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 6060;

app.use(express.static(path.join(__dirname, '../Front-end/public')));
app.use(express.json({ limit: '100mb' }));

app.use('/vreme', vremeRout);
app.use('/gpt', gptRout);
app.use('/sights', sightsRout);
app.use('/admin', adminRout);
app.use('/evenimente', eventsRout);

app.get('/en', async (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../Front-end/public/indexEn.html'));
});

app.get('/admin/login', async (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../Front-end/public/login.html'));
});

app.get('/admin', async (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../Front-end/public/indexAdmin.html'));
});

app.get('/obiective', async (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../Front-end/public/obiective.html'));
});

app.get('/sights', async (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../Front-end/public/obiectiveEN.html'));
});

app.get('/routes/car', async (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../Front-end/public/routes_car.html'));
});

app.get('/routes/onfoot', async (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../Front-end/public/routes_onfeet.html'));
});

app.get('/routes/bike', async (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../Front-end/public/routes_bicycle.html'));
});

app.get('/trasee/masina', async (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../Front-end/public/trasee_masina.html'));
});

app.get('/trasee/pejos', async (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../Front-end/public/trasee_pe_jos.html'));
});

app.get('/trasee/bicicleta', async (req, res) => {
  res
    .status(200)
    .sendFile(
      path.join(__dirname, '../Front-end/public/trasee_bicicleta.html')
    );
});

app.get('/evenimente', async (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../Front-end/public/evenimente.html'));
});

app.get('/events', async (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../Front-end/public/events.html'));
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
    setInterval(deleteExpiredPosts, 24 * 60 * 60 * 1000); // Run every 24 hours
  } catch (error) {
    console.log(error);
  }
};

start();
