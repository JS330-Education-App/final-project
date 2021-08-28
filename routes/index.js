const { Router } = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = Router();
const cookieParser = require('cookie-parser');
bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookieParser());


// router.get("/signup", (req, res, next) => {
//     res.render('index');
// });
router.get("/signup", (req, res, next) => {
  res.render('index');
});

router.get("/teachers", isLoggedIn, (req, res, next) => {
  res.render('teachers');
});

router.get("/students", isLoggedIn, (req, res, next) => {
  res.render('students');
});

router.get("/parents", isLoggedIn, (req, res, next) => {
  res.render('parents');
});

// router.get('/users/home', isLoggedIn, (req, res, next) => {
//   res.render('home');
// });

// router.use('/signup', require('./users'));
router.use("/login", require('./users'));


router.use("/users", require('./users'));
//router.use("/assignments", require('./assignments'));

router.use("/", (req, res, next) => {
  res.render('index');
});

router.get("/login", (req, res, next) => {
  res.render('login');
});



router.use("/assignments", require('./assignments'));

// router.get('/home/:token', isLoggedIn, (req, res, next) => {
//   res.render('home', { user: req.body });
// })

router.use("/teachers", (req, res, next) => {
  res.render('teachers');
});

router.use("/students", (req, res, next) => {
  res.render('students');
});

router.use("/parents", (req, res, next) => {
  res.render('parents');
});


// Need to fix routing because now to reach to the teachers we need to put /login/teachers
// template rote to /teachers view
// router.get("/teachers", (req, res, next) => {
//   res.render('teachers');
// });

// template rote to /students view
// router.get("/students", (req, res, next) => {
//   res.render('students');
// });

// template rote to /parents view
// router.get("/parents", (req, res, next) => {
//   res.render('parents');
// });



module.exports = router;