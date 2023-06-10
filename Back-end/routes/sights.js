const express = require('express');
const router = express.Router();
const { GetSightsCard, GetSightsExtra } = require('../controllers/sights');

router.get('/card', GetSightsCard);
router.post('/extra', GetSightsExtra);

module.exports = router;
