const userDAO = require("../daos/user");
const jwt = require('jsonwebtoken');
const secret = "my_super_secret";

const isLoggedIn = async function(req, res, next) {
    let token = req.header('Authorization');
    if (!token) {
        res.status(401).send("Token not found");
        return;
    }
    let bearer = 'Bearer ';
    if (!token.startsWith(bearer)) {
        res.status(401).send("Token is not valid");
        return;
    }
    token = token.substring(bearer.length).trim();

    jwt.verify(token, secret, async(err) => {
        if (err) {
            return res.status(401).send("Bad token");
        }

        const decodedToken = await jwt.decode(token);
        const user = await userDAO.getUserById(decodedToken._id);

        req.token = token;
        req.user = user;
        next();

    });
};

const role = (req, res, next) => {
  if (req.user.role.includes('teacher')) {
    req.user.role = 'teacher';
  } else if (req.user.role.includes('student')) {
    req.user.role = 'student';
  } else if (req.user.role.includes('parent')) {
    req.user.role = 'parent';
  }
  next();
};



module.exports = { isLoggedIn, role };