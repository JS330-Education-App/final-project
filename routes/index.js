const { Router } = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = Router();
const cookieParser = require('cookie-parser');
bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookieParser());
const assignmentDAO = require("../daos/assignment");

router.get("/signup", (req, res, next) => {
    res.render('index');
});

router.use("/assignments", require('./assignments'));

router.use("/users/teachers", isLoggedIn, (req, res, next) => {
    res.render('teachers', { user: req.user });
});

router.get("/users/students", isLoggedIn, async (req, res, next) => {
    const grade = await assignmentDAO.getAvgGradeByStudentId(req.user._id);
    let avg = grade[0].averageGrade;
    res.render('students', { user: req.user, avg });
});

router.get("/users/parents", isLoggedIn, async (req, res, next) => {
    const grade = await assignmentDAO.getAvgGradeByStudentId(req.user.externalID);
    let avg = grade[0].averageGrade; 
    res.render('parents', { user: req.user, avg });
});

router.use("/login", require('./users'));

router.use("/users", require('./users'));

router.use("/", (req, res, next) => {
    res.render('index');
});

module.exports = router;