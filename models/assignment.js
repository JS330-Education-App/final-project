const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    teacherID: { type: mongoose.Schema.Types.ObjectId, ref: 'user', requred: true },
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'user', requred: true, index: true },
    isSubmitted: { type: Boolean, required: true },
    grade: { type: Number },
    dueDate: { type: Date, required: true }

});

assignmentSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model("assignments", assignmentSchema);