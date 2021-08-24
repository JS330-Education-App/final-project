const { Router } = require("express");
const router = Router();
bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

router.use(bodyParser.json());

router.get("/signup", (req, res, next) => {
  res.render('index');
});

router.use('/signup', require('./users'));
router.use("/login", require('./users'));

router.get("/", (req, res, next) => {
  res.render('index');
});

module.exports = router;