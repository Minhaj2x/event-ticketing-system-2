const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  date:        { type: Date,   required: true },
  time:        { type: String, required: true },
  venue:       { type: String, required: true },
  seatCapacity:{ type: Number, required: true },
  price:       { type: Number, required: true },
  seatsAvailable: { type: Number, required: true }
});

// Initialize seatsAvailable to seatCapacity on creation
eventSchema.pre('save', function(next) {
  if (this.isNew) this.seatsAvailable = this.seatCapacity;
  next();
});

module.exports = mongoose.model('Event', eventSchema);
