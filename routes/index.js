const { Router } = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = Router();
const cookieParser = require('cookie-parser');
bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookieParser());


router.get("/signup", (req, res, next) => {
  res.render('index');
});

router.use("/assignments", require('./assignments'));

router.use("/users/teachers", isLoggedIn, (req, res, next) => {
  res.render('teachers', {user: req.user});
});

router.use("/users/students", isLoggedIn, (req, res, next) => {
  res.render('students', {user: req.user});
});

router.use("/users/parents", isLoggedIn, (req, res, next) => {
  res.render('parents', {user: req.user});
});

router.use("/login", require('./users'));

router.use("/users", require('./users'));

router.use("/", (req, res, next) => {
  res.render('index');
});

module.exports = router;