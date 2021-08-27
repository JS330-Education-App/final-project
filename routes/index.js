const { Router } = require("express");
const router = Router();
bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

router.use(bodyParser.json());

router.get("/signup", (req, res, next) => {
    res.render('index');
});


// router.use('/signup', require('./users'));
router.use("/login", require('./users'));


router.use("/users", require('./users'));
router.use("/assignments", require('./assignments'));

router.use("/", (req, res, next) => {
    res.render('index');
});

router.use("/teachers", (req, res, next) => {
    res.render('teachers');
});

router.use("/students", (req, res, next) => {
    res.render('students');
});

router.use("/parents", (req, res, next) => {
    res.render('parents');
});

router.get("/login", (req, res, next) => {
  res.render('login');
});




// Need to fix routing because now to reach to the teachers we need to put /login/teachers
// template rote to /teachers view
router.get("/teachers", (req, res, next) => {
  res.render('teachers');
});

// template rote to /students view
router.get("/students", (req, res, next) => {
  res.render('students');
});

// template rote to /parents view
router.get("/parents", (req, res, next) => {
  res.render('parents');
});



module.exports = router;