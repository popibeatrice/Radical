const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  expDate: Date,
});

module.exports = mongoose.model('Event', EventSchema);
