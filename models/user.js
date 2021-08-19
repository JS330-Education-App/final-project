const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: { type: String, required: true },
    externalID: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    // studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    // teacherID: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    gradeLevel: { type: Number }
});

// if teacher -> externalID and gradeLevel are empty string
// if parent  -> gradeLevel is empty string
// gradeLevel only for student
// let me in
// magic commit

module.exports = mongoose.model("users", userSchema);