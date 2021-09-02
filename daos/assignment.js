const Assignment = require("../models/assignment");
const mongoose = require("mongoose");
module.exports = {};

module.exports.createAssignment = async(assignment) => {
    return await Assignment.create(assignment);
};

module.exports.getAssignment = async(assignmentId) => {
    const assignment = await Assignment.findOne({ _id: assignmentId }).lean();
    if (!assignment) {
        throw new Error("Not found");
    }

    return assignment;
};

module.exports.getAllAssignments = async(userId) => {
    const assignments = await Assignment.find({ teacherID: userId }).lean();
    if (!assignments) {
        throw new Error("Not found");
    }

    return assignments;
};

module.exports.getAssignmentsByStudentId = async(userId) => {
    const assignments = await Assignment.find({ studentID: userId }).lean();
    if (!assignments) {
        throw new Error("Not found");
    }

    return assignments;
};

module.exports.deleteAssignment = async(assignmentId) => {
    const assignment = await Assignment.deleteOne({ _id: assignmentId });
};

module.exports.gradeAssignment = async(assignmentId, grade) => {
    const assignment = await Assignment.findOneAndUpdate({ _id: assignmentId }, { grade: grade });
    if (!assignment) {
        throw new Error("Not found");
    }

    return assignment;
};


module.exports.submitAssignment = async(assignmentId) => {
    const assignment = await Assignment.findOneAndUpdate({ _id: assignmentId }, { $set: { 'isSubmitted': true } });
    if (!assignment) {
        throw new Error("Not found");
    }

    return assignment;
};

module.exports.getAvgGradeByStudentId = async(studentId) => {
    const result = await Assignment.aggregate([
        { $match: { studentID: mongoose.Types.ObjectId(studentId) } },
        {
            $group: {
                _id: "$studentID",
                averageGrade: { $avg: "$grade" },
            },
        },
        { $project: { _id: 0, studentID: "$_id", averageGrade: 1 } },
    ]);

    if (!result) {
        throw new Error("Not found");
    }

    return result;
};


module.exports.search = (query) => {
    return Assignment.find({ $text: { $search: query } }, { score: { $meta: "textScore" } })
        .sort({ score: { $meta: "textScore" } })
        .lean();
};

module.exports.partialSearch = async(query) => {
    const result = await Assignment.aggregate([{
            $match: {
                $or: [{
                        title: {
                            $regex: query,
                            '$options': 'i'
                        }
                    },
                    {
                        content: {
                            $regex: query,
                            '$options': 'i'
                        }
                    }
                ]
            }
        }, {
            $lookup: {
                from: "users",
                localField: "studentID",
                foreignField: "_id",
                as: "users"
            }
        },
        { $unwind: "$users" },
        {
            $group: {
                _id: {
                    title: "$title",
                    content: "$content",
                    dueDate: "$dueDate",
                    studentName: "$users.name"
                }

            }
        },
        { $project: { _id: 0, assignment: "$_id" } },
        { $unwind: "$assignment" },
        { $sort: { title: 1 } }

    ]);

    return result;
};