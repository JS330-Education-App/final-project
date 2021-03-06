const User = require('../models/user');
const mongoose = require("mongoose");
module.exports = {};

module.exports.getUser = async(email) => {
    return await User.findOne({ email: email }).lean();
}

module.exports.updateUserPassword = async(userId, password) => {

    return await User.updateOne({ _id: userId }, { $set: { 'password': password } });
}

module.exports.createUser = async(userObj) => {
    return await User.create(userObj);
}

module.exports.getUserById = async(userId) => {
    return await User.findOne({ _id: userId }).lean();
}


module.exports.getStudentById = async(studentId, externalId) => {
    return await User.findOne({ _id: studentId, externalID: externalId }).lean();
}


module.exports.getStudentByEmail = async(studentEmail, teacherId) => {
    return await User.findOne({ email: studentEmail, externalID: teacherId }).lean();
}

module.exports.getAllStudents = async(teacherId) => {
    const result = await User.find({ externalID: teacherId });

    return result;

}