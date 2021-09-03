const { Router } = require("express");
const router = Router({ mergeParams: true });

const assignmentDAO = require("../daos/assignment");
const userDAO = require("../daos/user");
const isLoggedIn = require("../middleware/isLoggedIn");

router.use(async(req, res, next) => {
    isLoggedIn(req, res, next);
});

const errorHandler = require("../middleware/errorHandler");



// Get avarege grade   for a student by student email
// Body request:
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
        next(e);
    }
});

// POST /submit - student can submit an assignment on a student view page
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
        next(e);
    }
});


// POST /updateAndSubmit - student can update and submit an assignment on a student view page
// Student can enter any values into input form through UI
// Body request:
// { "assignmentId": "612bca87ebb57f20e68e69e4", 
//    "content" : " new content from input form"
// }

router.post("/updateAndSubmit", async(req, res, next) => {
    try {
        const assignmentId = req.body.assignmentId;
        const newContent = req.body.content;

        if (req.user.role !== "student") {
            throw new Error("Unauthorized");
        }
        const assignment = await assignmentDAO.submitAndUpdate(assignmentId, newContent);
        // res.json(assignment);
        res.render('students', { assignment: assignment, user: req.user });

    } catch (e) {
        next(e);
    }
});




// Grade assignment, only for a teacher.
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
        next(e);
    }
});


// Delete an assignment. Only teacher can delete an asssignment. Because we cannot DELETE method
// in HTML action form, we can use POST method to delete an assignment
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
        next(e);
    }
});




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
            throw new Error("Not found");
        }
        assignment.studentID = student._id;
        assignment.teacherID = userId;
        const postedAssignment = await assignmentDAO.createAssignment(
            assignment
        );
        res.render('teachers', { postAssignment: postedAssignment, user: req.user, studentEmail: req.body.studentEmail });
    } catch (e) {
        next(e);
    }
});


//Get Search by title/context
router.get("/search", async(req, res, next) => {
    try {
        if (req.user.role === "parent") {
            throw new Error("Unauthorized");
        }
        let query = req.query.title;
        console.log('query ', query);
        const result = await assignmentDAO.partialSearch(query);
        res.render('teachers', { searchResults: result, user: req.user });
        // res.json(result);
    } catch (e) {
        next(e);
    }
});


// Get all teacher's assignments,  only for teacher
// http://localhost:5000/assignments

router.get("/", async(req, res, next) => {
    try {
        if (req.user.role !== "teacher") {
            throw new Error("Unauthorized");
        }
        const userId = req.user._id;
        const assignments = await assignmentDAO.getAllAssignments(userId);
        res.render('teachers', { assignments: assignments, user: req.user });
        // res.json(assignments);

    } catch (e) {
        next(e);
    }
});




// Get all assignment  for a student, when user is logged in as a student - option 2
router.get("/assignmentsForStudent", async(req, res, next) => {
    try {
        if (req.user.role !== "student") {
            throw new Error("Unauthorized");
        }
        const email = req.user.email;
        const student = await userDAO.getUser(email);
        const assignments = await assignmentDAO.getAssignmentsByStudentId(student._id);

        const grade = await assignmentDAO.getAvgGradeByStudentId(student._id);
        let avg = grade[0].averageGrade;

        res.render('students', { assignments: assignments, user: req.user, avg });

    } catch (e) {
        next(e);
    }
});

// Get all assignments  for a parent, when user is logged in as a parent
router.get("/assignmentsForParent", async(req, res, next) => {
    try {
        if (req.user.role !== "parent") {
            throw new Error("Unauthorized");
        }
        const studentId = req.user.externalID;
        const assignments = await assignmentDAO.getAssignmentsByStudentId(studentId);

        const grade = await assignmentDAO.getAvgGradeByStudentId(studentId);
        let avg = grade[0].averageGrade; 

        res.render('parents', { assignments: assignments, user: req.user, avg });

    } catch (e) {
        next(e);
    }
});


// Get avarege grade  for a student by student id
router.get("/student/grades/:id", async(req, res, next) => {
    try {

        const studentId = req.params.id;
        const grade = await assignmentDAO.getAvgGradeByStudentId(studentId);

        res.json(grade);
    } catch (e) {
        next(e);
    }
});



// Get an assignemnt by id, authorized only for teacher and student
router.get("/:id", async(req, res, next) => {
    try {

        if (req.user.role === "parent") {
            throw new Error("Unauthorized");
        }
        const assignmentId = req.params.id;
        const assignment = await assignmentDAO.getAssignment(assignmentId);
        if (req.user.role === "student" && assignment.studentID !== req.user._id) {
            throw new Error("Invalid assignment");
        }
        res.json(assignment);
    } catch (e) {
        next(e);
    }
});



router.use(async(err, req, res, next) => {
    errorHandler(err, req, res, next);
});


module.exports = router;