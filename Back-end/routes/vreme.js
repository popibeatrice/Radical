const express = require('express');
const router = express.Router();
const { GetVreme } = require('../controllers/vreme');

router.get('/', GetVreme);

module.exports = router;
