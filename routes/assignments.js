const { Router } = require("express");
const router = Router({ mergeParams: true });

const assignmentDAO = require("../daos/assignment");
const userDAO = require("../daos/user");
const isLoggedIn = require("../middleware/isLoggedIn");

router.use(async(req, res, next) => {
    isLoggedIn(req, res, next);
});

const errorHandler = require("../middleware/errorHandler");



// get avarege grade   for a student by student email

// {
//     "studentEmail": "level8@gmai.com"

// }
router.post("/student/grades", async(req, res, next) => {
    try {

        const studentEmail = req.body.studentEmail;
        const student = await userDAO.getUser(studentEmail);
        const grade = await assignmentDAO.getAvgGradeByStudentId(student._id);

        res.json(grade);
    } catch (e) {
        console.log("error ", e.message);
        next(e);
    }
});

// POST /submit 
// Body request:
// { "assignmentId": "612bca87ebb57f20e68e69e4" }

router.post("/submit", async(req, res, next) => {
    try {
        const assignmentId = req.body.assignmentId;
        if (req.user.role !== "student") {
            throw new Error("Unauthorized");
        }
        const assignment = await assignmentDAO.submitAssignment(assignmentId);
        res.render('students', { assignment: assignment, user: req.user });

    } catch (e) {
        console.log("error ", e.message);
        next(e);
    }
});

// grade assignment, only for a teacher. :id - assignment id
// Body request:
// {
//     "assignmentId": "612bca87ebb57f20e68e69e4",
//     "grade": "80"

// }
router.post("/grade", async(req, res, next) => {
    try {

        if (req.user.role !== "teacher") {
            throw new Error("Unauthorized");
        }
        const assignmentId = req.body.assignmentId;
        const grade = parseInt(req.body.grade);
        const assignment = await assignmentDAO.gradeAssignment(assignmentId, grade);
        res.json(assignment);
    } catch (e) {
        console.log("error ", e.message);
        next(e);
    }
});


// Delete an assignment. Only teacher can delete an asssignment. 
// Body request:
// {
//     "assignmentId": "612c284e8a6a0629e59d9384"

// }

router.post("/delete", async(req, res, next) => {
    try {

        if (req.user.role !== "teacher") {
            throw new Error("Unauthorized");
        }

        const assignmentId = req.body.assignmentId;
        const deleted = await assignmentDAO.deleteAssignment(assignmentId);

        res.sendStatus(200);
    } catch (e) {
        console.log("error ", e.message);
        next(e);
    }
});


// // http://localhost:5000/assignments/:id

// router.post("/:id", async(req, res, next) => {
//     try {

//         if (req.user.role !== "teacher") {
//             throw new Error("Unauthorized");
//         }
//         const userId = req.user._id;
//         let assignment = req.body;
//         assignment.grade = 0;
//         assignment.isSubmitted = false;
//         const studentId = req.params.id;
//         const student = await userDAO.getUserById(studentId);

//         if (!assignment) {
//             throw new Error("Assignment not found");
//         }
//         assignment.studentID = student._id;
//         assignment.teacherID = userId;
//         const postedAssignment = await assignmentDAO.createAssignment(
//             assignment,
//             userId
//         );

//         res.json(postedAssignment);
//     } catch (e) {
//         console.log("error ", e.message);
//         next(e);
//     }
// });



// POST /create assignment  - open to teacher only
// JSON body  requst to post assignment using student email as ID
// {
//     "studentEmail": "level8@gmai.com",
//     "title": "home work week from teacher@gmail.com",
//     "content": "do at least something",
//     "gradeLevel": "8",
//     "grade": "0",
//     "dueDate": "09/11/2021"

// }
router.post("/", async(req, res, next) => {
    try {

        if (req.user.role !== "teacher") {
            throw new Error("Unauthorized");
        }
        const userId = req.user._id;
        let assignment = req.body;
        assignment.grade = 0;
        assignment.isSubmitted = false;
        const studentEmail = req.body.studentEmail;
        const student = await userDAO.getUser(studentEmail);

        if (!assignment) {
            throw new Error("Assignment not found");
        }
        assignment.studentID = student._id;
        assignment.teacherID = userId;
        // const postedAssignment = await assignmentDAO.createAssignment(
        //     assignment,
        //     userId
        // );
        const postedAssignment = await assignmentDAO.createAssignment(
            assignment
        );

        // res.json(postedAssignment);
        res.render('teachers', { postAssignment: postedAssignment, user: req.user, studentEmail: req.body.studentEmail });
    } catch (e) {
        console.log("error ", e.message);
        next(e);
    }
});


// search by title/context
router.get("/search", async(req, res, next) => {
    try {
        if (req.user.role === "parent") {
            throw new Error("Unauthorized");
        }
        let query = req.query.title;
        console.log('query ', query);
        const result = await assignmentDAO.partialSearch(query);
        // res.json(result);
        res.render('teachers', { searchResults: result, user: req.user });
    } catch (e) {
        console.log("error ", e.message);
        next(e);
    }
});


// get all teacher's assignments,  only for teacher
// http://localhost:5000/assignments

router.get("/", async(req, res, next) => {
    try {
        if (req.user.role !== "teacher") {
            throw new Error("Unauthorized");
        }
        const userId = req.user._id;
        const assignments = await assignmentDAO.getAllAssignments(userId);

        //res.json(assignments);
        res.render('teachers', { assignments: assignments, user: req.user });

    } catch (e) {
        console.log("error ", e.message);
        next(e);
    }
});


// get all assignment  for a student, :id == student id
// update call's name
// router.get("/student/:id", async(req, res, next) => {
//     try {
//         if (req.user.role === "parent") {
//             throw new Error("Unauthorized");
//         }
//         const studentId = req.params.id;
//         const assignments = await assignmentDAO.getAssignmentsByStudentId(studentId);

//         res.json(assignments);
//         // title and due date
//     } catch (e) {
//         console.log("error ", e.message);
//         next(e);
//     }
// });


// get all assignment  for a student, when user is logged in as a student - option 2
router.get("/assignmentsForStudent", async(req, res, next) => {
    try {
        if (req.user.role !== "student") {
            throw new Error("Unauthorized");
        }
        const email = req.user.email;
        const student = await userDAO.getUser(email);
        const assignments = await assignmentDAO.getAssignmentsByStudentId(student._id);
        //res.json(assignments);
        res.render('students', { assignments: assignments, user: req.user });

    } catch (e) {
        console.log("error ", e.message);
        next(e);
    }
});

// get all assignment  for a parent, when user is logged in as a parent
router.get("/assignmentsForParent", async(req, res, next) => {
    try {
        if (req.user.role !== "parent") {
            throw new Error("Unauthorized");
        }
        const studentId = req.user.externalID;
        const assignments = await assignmentDAO.getAssignmentsByStudentId(studentId);
        //res.json(assignments);
        res.render('parents', { assignments: assignments, user: req.user });

    } catch (e) {
        console.log("error ", e.message);
        next(e);
    }
});


// get avarege grade  for a student by student id
router.get("/student/grades/:id", async(req, res, next) => {
    try {

        const studentId = req.params.id;
        const grade = await assignmentDAO.getAvgGradeByStudentId(studentId);

        res.json(grade);
    } catch (e) {
        console.log("error ", e.message);
        next(e);
    }
});



// get one assignemnt by id, authorized only for teacher and student
router.get("/:id", async(req, res, next) => {
    try {

        if (req.user.role === "parent") {
            throw new Error("Unauthorized");
        }
        const assignmentId = req.params.id;
        const assignment = await assignmentDAO.getAssignment(assignmentId);
        if (req.user.role === "student" && assignment.studentID !== req.user._id) {
            throw new Error("Invalid request");
        }
        res.json(assignment);
    } catch (e) {
        console.log("error ", e.message);
        next(e);
    }
});



router.use(async(err, req, res, next) => {
    errorHandler(err, req, res, next);
});


module.exports = router;