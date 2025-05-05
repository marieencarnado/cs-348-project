const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  destination_id: Number,
  name: String,
  country: String,
  continent: String
});

module.exports = mongoose.model('Destination', destinationSchema);
