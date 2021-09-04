const userDAO = require("../daos/user");
const jwt = require('jsonwebtoken');
const secret = "my_super_secret";
const { Router } = require("express");
const router = Router({ mergeParams: true });
const errorHandler = require("../middleware/errorHandler");

// const isLoggedIn = async function(req, res, next) {
//     let token = req.cookies['AuthToken'];
//     if (!token) {
//         res.status(401).send("Token not found");
//         return;
//     }
//     let bearer = 'Bearer ';
//     if (!token.startsWith(bearer)) {
//         res.status(401).send("Token is not valid");
//         return;
//     }
//     token = token.substring(bearer.length).trim();

//     jwt.verify(token, secret, async(err) => {
//         if (err) {
//             return res.status(401).send("Bad token");
//         }

//         const decodedToken = await jwt.decode(token);
//         const user = await userDAO.getUserById(decodedToken._id);

//         req.token = token;
//         req.user = user;

//         next();

//     });
// };



const isLoggedIn = async function(req, res, next) {
    try {
        let token = req.cookies['AuthToken'];
        if (!token) {
            throw new Error("Token not found");
        }
        // let bearer = 'Bearer ';
        // if (!token.startsWith(bearer)) {
        //     throw new Error("Bad token");
            // res.status(401).send("Token is not valid");
            // return;
        //}
        //token = token.substring(bearer.length).trim();

        jwt.verify(token, secret, async(err) => {
            if (err) {
                throw new Error("Bad token");
                // return res.status(401).send("Bad token");
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