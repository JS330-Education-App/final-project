const userDAO = require("../daos/user");
const jwt = require('jsonwebtoken');
const secret = "my_super_secret";
const { Router } = require("express");
const router = Router({ mergeParams: true });
const errorHandler = require("../middleware/errorHandler");

const isLoggedIn = async function(req, res, next) {
    try {

        let token = req.cookies['AuthToken'];
        if (!token) {
            throw new Error("Token not found");
        }

        jwt.verify(token, secret, async(err) => {
            if (err) {
                throw new Error("Bad token");
            }

            const decodedToken = await jwt.decode(token);
            const user = await userDAO.getUserById(decodedToken._id);

            req.token = token;
            req.user = user;
            next();

        });

    } catch (e) {
        next(e);
    }
};


router.use(async(err, req, res, next) => {
    errorHandler(err, req, res, next);
});

module.exports = isLoggedIn;