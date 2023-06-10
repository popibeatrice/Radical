const mongoose = require('mongoose');

const SightSchema = new mongoose.Schema({
  titleRo: String,
  titleEn: String,
  descpRo: String,
  descpEn: String,
  type: String,
  lat: mongoose.Types.Decimal128,
  lng: mongoose.Types.Decimal128,
});

module.exports = mongoose.model('Sight', SightSchema);
