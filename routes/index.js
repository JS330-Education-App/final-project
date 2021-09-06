const { Router } = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = Router();
const cookieParser = require('cookie-parser');
bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookieParser());
const userDAO = require("../daos/user");
const assignmentDAO = require("../daos/assignment");

router.get("/signup", (req, res, next) => {
    res.render('index');
});

router.use("/assignments", require('./assignments'));

router.get("/users/teachers", isLoggedIn, async (req, res, next) => {
    const students = await userDAO.getAllStudents(req.user._id);
    const assignments = await assignmentDAO.getAllAssignments(req.user._id);
    res.render('teachers', { user: req.user, students, assignments });
});

router.get("/users/students", isLoggedIn, async (req, res, next) => {
    let grade = await assignmentDAO.getAvgGradeByStudentId(req.user._id);
    let avg;
    if (grade.length > 0) {
      avg = grade[0].averageGrade;
    } else {
      avg = 0;
    }
    
    res.render('students', { user: req.user, avg });
});

router.get("/users/parents", isLoggedIn, async (req, res, next) => {
    let grade = await assignmentDAO.getAvgGradeByStudentId(req.user.externalID);
    let avg;
    if (grade.length > 0) {
      avg = grade[0].averageGrade;
    } else {
      avg = 0;
    }
    res.render('parents', { user: req.user, avg });
});

router.use("/login", require('./users'));

router.use("/users", require('./users'));

router.use("/", (req, res, next) => {
    res.render('index');
});

module.exports = router;