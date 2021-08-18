const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String },
    yearBorn: { type: Number },
    date: { type: Number },
    date2: { type: Number }
});


module.exports = mongoose.model("authors", authorSchema);