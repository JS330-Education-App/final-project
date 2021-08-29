const { Router } = require("express");
const router = Router({ mergeParams: true });

const assignmentDAO = require("../daos/assignment");
const userDAO = require("../daos/user");
const isLoggedIn = require("../middleware/isLoggedIn");

router.use(async(req, res, next) => {
    isLoggedIn(req, res, next);
});

const errorHandler = require("../middleware/errorHandler");


// POST /create assignment  - open to teacher only
//  If the user is logged in, it should store the incoming assignemnt along with their userId
// :id - studentId
// JSON body  requst to post assignment using student email as ID
// {
//    
//     "title": "home work week from teacher@gmail.com",
//     "content": "do at least something",
//     "gradeLevel": "8",
//     "grade": "0",
//     "dueDate": "09/11/2021"

// }
// http://localhost:5000/assignments/:id

router.post("/:id", async(req, res, next) => {
    try {

        if (req.user.role !== "teacher") {
            throw new Error("Unauthorized");
        }
        const userId = req.user._id;
        let assignment = req.body;
        assignment.grade = 0;
        const studentId = req.params.id;
        const student = await userDAO.getUserById(studentId);

        if (!assignment) {
            throw new Error("Assignment not found");
        }
        assignment.studentID = student._id;
        assignment.teacherID = userId;
        const postedAssignment = await assignmentDAO.createAssignment(
            assignment,
            userId
        );

        res.json(postedAssignment);
    } catch (e) {
        console.log("error ", e.message);
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
        const studentEmail = req.body.studentEmail;
        const student = await userDAO.getUser(studentEmail);

        if (!assignment) {
            throw new Error("Assignment not found");
        }
        assignment.studentID = student._id;
        assignment.teacherID = userId;
        const postedAssignment = await assignmentDAO.createAssignment(
            assignment,
            userId
        );

        res.json(postedAssignment);
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
        //let { page, perPage, query } = req.query;
        let query = req.query.title;
        console.log('query ', query);

        //page = page ? Number(page) : 0;
        //perPage = perPage ? Number(perPage) : 10;
        //const result = await assignmentDAO.search(query, page, perPage);
        const result = await assignmentDAO.search(query);
        res.json(result);
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

        res.json(assignments);
    } catch (e) {
        console.log("error ", e.message);
        next(e);
    }
});


// get all assignment  for a student, :id == student id
router.get("/student/:id", async(req, res, next) => {
    try {
        if (req.user.role === "parent") {
            throw new Error("Unauthorized");
        }
        const studentId = req.params.id;
        const assignments = await assignmentDAO.getAssignmentsByStudentId(studentId);

        res.json(assignments);
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

// grade assignment, only for a teacher
// {
//     "grade": "80"

// }
router.put("/:id", async(req, res, next) => {
    try {

        if (req.user.role !== "teacher") {
            throw new Error("Unauthorized");
        }
        const assignmentId = req.params.id;
        const grade = parseInt(req.body.grade);
        const assignment = await assignmentDAO.updateAssignment(assignmentId, grade);
        res.json(assignment);
    } catch (e) {
        console.log("error ", e.message);
        next(e);
    }
});


// only teacher can delete asssignment
router.delete("/:id", async(req, res, next) => {
    try {

        if (req.user.role !== "teacher") {
            throw new Error("Unauthorized");
        }

        const assignmentId = req.params.id;
        const deleted = await assignmentDAO.deleteAssignment(assignmentId);

        res.sendStatus(200);
    } catch (e) {
        console.log("error ", e.message);
        next(e);
    }
});


router.use(async(err, req, res, next) => {
    errorHandler(err, req, res, next);
});


module.exports = router;