const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String },
  yearBorn: { type: Number }
});


module.exports = mongoose.model("authors", authorSchema);