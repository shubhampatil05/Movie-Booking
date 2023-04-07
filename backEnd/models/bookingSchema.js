const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  movie: String,
  city: String,
  theatre: String,
  time: String,
  total: Number,
  movieImg: String,
  paymentBy: String,
  seatName: [{ type: String }],
});

const bookingModel = mongoose.model("infos", bookingSchema);

module.exports = bookingModel;
