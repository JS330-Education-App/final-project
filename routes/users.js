const { Router } = require("express");
const router = Router({ mergeParams: true });

const userDAO = require("../daos/user");
const assignmentDAO = require("../daos/assignment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "my_super_secret";

const isLoggedIn = require("../middleware/isLoggedIn");
const errorHandler = require("../middleware/errorHandler");
const cookieParser = require("cookie-parser");

// template route to /login
router.get("/", (req, res, next) => {
    res.render('login');
});

// Signup: POST /login/signup
router.post("/signup", async(req, res, next) => {
    try {
        const user = req.body;

        if (!user) {
            throw new Error("Not found");
        }
        if (!user.email || user.email.trim() === "") {
            throw new Error("Empty field");
        }

        if (!user.name || user.name === "") {
            throw new Error("Empty field");
        }

        if (!user.role) {
            throw new Error("Empty field");
        }

        let mRole = user.role.trim();
        if (!(mRole === "student" || mRole === "parent" || mRole === "teacher")) {
            throw new Error("Empty field");
        }

        if (!user.password || user.password.trim() === "") {
            throw new Error("Empty field");
        }

        const email = user.email.trim();
        const name = user.name.trim();
        const role = user.role.trim();
        const checkUser = await userDAO.getUser(email);

        if (checkUser) {
            throw new Error("User already exists");
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
                throw new Error("Empty field");
            }
            const student = await userDAO.getUser(user.studentEmail);
            if (!student) {
                throw new Error("Empty field");
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
                gradeLevel: gradeLevel,
            });
        }

        req.user = newUser;
        res.redirect('/login');

    } catch (e) {
        next(e)
    }
});

// Login: POST /login
router.post("/login", async(req, res, next) => {

    try {
        let incomingUser = req.body;
        if (!incomingUser) {

            throw new Error("Invalid request");
        }

        let email = incomingUser.email;
        let userFromDB = await userDAO.getUser(email);

        if (!userFromDB) {
            throw new Error("Not found");
        }
        let pswd = incomingUser.password;
        if (!pswd) {
            throw new Error("Empty field");
        }
        pswd = pswd.trim();
        if (pswd === "") {
            throw new Error("Empty field");
        }

        let result = await bcrypt.compare(pswd, userFromDB.password);
        if (!result) {
            throw new Error("Passwords do not match");
        }

        const data = {
            _id: userFromDB._id,
            email: userFromDB.email,
            name: userFromDB.name,
            role: userFromDB.role
        };

        let token = await jwt.sign(data, secret, { expiresIn: '1 day' });

        if (token) {
            res.cookie('AuthToken', token, { expires: new Date(Date.now() + 8 * 3600000) }); // cookie will be removed after 8 hours
            if (userFromDB.role === 'teacher') {
                res.redirect('/users/teachers');
            } else if (userFromDB.role === 'student') {
                res.redirect('/users/students');
            } else if (userFromDB.role === 'parent') {
                res.redirect('/users/parents');
            }
        };

    } catch (e) {
        next(e);
    }
});


router.post("/logout", async(req, res, next) => {
    res.status(404).send("User is required");
});

router.use(async(req, res, next) => {
    isLoggedIn(req, res, next);
});



// Get one student by id only for teacher and parent, teacher/parent id should be equal student's ExternalId
router.get("/student/:id", async(req, res, next) => {
    try {
        if (req.user.role !== "teacher" || req.user.role !== "parent") {
            throw new Error("Unauthorized");
        }
        const studentId = req.params.id;
        const externalId = req.user._id;
        const student = await userDAO.getStudentById(studentId, externalId);
        if (!student) {
            throw new Error("Not found");
        }
        res.json(student);
    } catch (e) {
        next(e);
    }
});


// Get all students for a teacher, authorized only for teacher, teacher id == student ExternalId
// returns list of students' emails and names
// add student name to output 
router.get("/getAllStudents", async(req, res, next) => {
    try {
        if (req.user.role !== "teacher") {
            throw new Error("Unauthorized");
        }

        const students = await userDAO.getAllStudents(req.user._id);
        res.render('teachers', { students: students, user: req.user });

    } catch (e) {
        next(e);
    }
});

router.use(async(err, req, res, next) => {
    errorHandler(err, req, res, next);
});

module.exports = router;