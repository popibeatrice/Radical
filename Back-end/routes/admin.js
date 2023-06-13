const express = require('express');
const router = express.Router();

const path = require('path');

const { LogIn } = require('../controllers/admin');
const { VerifyAdminMain } = require('../controllers/admin');
const { CreateSight } = require('../controllers/admin');
const { GetDef } = require('../controllers/admin');
const { EditSight } = require('../controllers/admin');
const { DeleteSight } = require('../controllers/admin');

router.post('/login', LogIn);

router.post('/', VerifyAdminMain);

router.post('/create', CreateSight);

router.post('/edit/:id', EditSight);

router.get('/create', async (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../../Front-end/public/create.html'));
});

router.get('/edit', async (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../../Front-end/public/edit.html'));
});

router.get('/edit/:id', GetDef);

router.post('/delete/:id', DeleteSight);

module.exports = router;
