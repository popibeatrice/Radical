const express = require('express');
const router = express.Router();
const { GetEvents } = require('../controllers/events');

router.get('/events', GetEvents);

module.exports = router;
