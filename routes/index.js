const { Router } = require("express");
const router = Router();

router.use("/login", require('./users'));


module.exports = router;