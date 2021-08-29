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

router.use("/assignments", require('./assignments'));

router.get("/users/teachers", isLoggedIn, (req, res, next) => {
  res.render('teachers', {user: req.user});
});

router.get("/users/students", isLoggedIn, (req, res, next) => {
  res.render('students', {user: req.user});
});

router.get("/users/parents", isLoggedIn, (req, res, next) => {
  res.render('parents', {user: req.user});
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





// router.get('/home/:token', isLoggedIn, (req, res, next) => {
//   res.render('home', { user: req.body });
// })

router.use("/users/teachers", (req, res, next) => {
  res.render('teachers');
});



router.use("/users/students", (req, res, next) => {
  res.render('students');
});

router.use("/users/parents", (req, res, next) => {
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