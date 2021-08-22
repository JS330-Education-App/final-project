const { Router } = require("express");
const router = Router({ mergeParams: true });

const userDAO = require("../daos/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "my_super_secret";
const isLoggedIn = require("../middleware/isLoggedIn");

// template rute to /login
router.use("/", (req, res, next) => {
    res.render('login');
});

// Signup: POST /login/signup

router.post("/signup", async(req, res, next) => {
  try {
    const user = req.body;

    if (!user) {
        res.status(400).send("User not found");
        return;
    }
    if (!user.email || user.email.trim() === "") {
        res.status(400).send("Email not found");
        return;
    }

    if (!user.name || user.name === "") {
        res.status(400).send("Name is required");
        return;
    }

    if (!user.role) {
        res.status(400).send("Role is required");
        return;
    }

    let mRole = user.role.trim();
    if (!(mRole === "student" || mRole === "parent" || mRole === "teacher")) {
        res.status(400).send("Role is invalid");
        return;
    }

    if (!user.password || user.password.trim() === "") {
        res.status(400).send("Password is required");
        return;
    }

    const email = user.email.trim();
    const name = user.name.trim();
    const role = user.role.trim();
    const checkUser = await userDAO.getUser(email);

    if (checkUser) {
        res.status(409).send("User already exists");
        return;
    }

    const textPassword = user.password.trim();
    let savedHash = await bcrypt.hash(textPassword, 10);

    if (role === "teacher") {
        newUser = await userDAO.createUser({
            email: email,
            name: name,
            password: savedHash,
            role: role,
        });
    } else if (role === "parent") {
        if (!user.studentEmail || user.studentEmail.trim() === "") {
            res.status(400).send("Student email is required");
            return;
        }
        const student = await userDAO.getUser(user.studentEmail);
        if (!student) {
            res.status(409).send("Student is not registered yet");
            return;
        }
        newUser = await userDAO.createUser({
            email: email,
            name: name,
            password: savedHash,
            role: role,
            externalID: student._id,
        });
    } else if (role === "student") {
        if (!user.teacherEmail || user.teacherEmail.trim() === "") {
            res.status(400).send("Teacher email not found");
            return;
        }

        if (!user.gradeLevel || user.gradeLevel.trim() === "") {
            res.status(400).send("Grade level is required");
            return;
        }

        const gradeLevel = user.gradeLevel.trim();
        const teacher = await userDAO.getUser(user.teacherEmail);
        if (!teacher) {
            res.status(409).send("Teacher not registered yet");
            return;
        }
        newUser = await userDAO.createUser({
            email: email,
            name: name,
            password: savedHash,
            role: role,
            externalID: teacher._id,
            gradeLevel: gradeLevel
        });
    }

    req.user = newUser;
    res.json(newUser);
    res.status(200).send("Ok");

  } catch (e) {
    next (e)
  } 
});

// Login: POST /login
router.post("/", async(req, res, next) => {
    let incomingUser = req.body;
    if (!incomingUser) {
        res.status(401).send("User not found");
        return;
    }

    let email = incomingUser.email;
    let userFromDB = await userDAO.getUser(email);

    if (!userFromDB) {
        res.status(401).send("User not found");
        return;
    }
    let pswd = incomingUser.password;
    if (!pswd) {
        res.status(400).send("Password not found");
        return;
    }
    pswd = pswd.trim();
    if (pswd === "") {
        res.status(400).send("Password must not be empty");
        return;
    }

    let result = await bcrypt.compare(pswd, userFromDB.password);
    if (!result) {
        res.status(401).send("Passwords do not match");
        return;
    }
    res.status(200);

    const data = {
        _id: userFromDB._id,
        email: userFromDB.email,
        name: userFromDB.name,
        role: userFromDB.role
    };

    let token = await jwt.sign(data, secret, { expiresIn: '1 day' });

    if (token) {
        req.body.token = token;
        res.json(req.body);
    }
});


router.post("/logout", async(req, res, next) => {

    res.status(404).send("User is required");
});


router.use(async(req, res, next) => {
    isLoggedIn(req, res, next);
});


//   Change Password POST /login/password
router.post("/password", async(req, res, next) => {
    let password = req.body.password;
    if (!password) {
        res.status(400).send("Password is required");
        return;
    }
    password = password.trim();

    if (password === "") {
        res.status(400).send("Password is required");
        return;
    }
    let savedHash = await bcrypt.hash(password, 10);
    const postedUser = await userDAO.updateUserPassword(req.user._id, savedHash);
    res.status(200).send("Ok");
});

module.exports = router;