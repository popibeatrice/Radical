const express = require('express');
const router = express.Router();
const gpt = require('../controllers/gpt');

const GptRo = gpt.GptRo;
const GptEn = gpt.GptEn;

router.post('/ro', GptRo);
router.post('/en', GptEn);

module.exports = router;
