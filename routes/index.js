const { Router } = require("express");
const router = Router();

router.use("/login", require('./users'));

router.get("/", (req, res, next) => {
    res.render('index');
});

module.exports = router;