const { Router } = require("express");
const router = Router();

router.use("/login", require('./users'));

router.get("/", (req, res, next) => {
    res.render('index');
});

router.use('/login', require('./users'));

module.exports = router;