const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  trip_name: String,
  destination: String,
  continent: String,
  start_date: Date,
  end_date: Date,
  status: String,
  lodgingType: String,
  selectedBuddies: [String],
  total_cost: Number
});

module.exports = mongoose.model('Trip', tripSchema);
