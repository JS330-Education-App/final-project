const { Router } = require("express");
const router = Router({ mergeParams: true });

const userDAO = require("../daos/user");
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
                gradeLevel: gradeLevel,
            });
        }

        req.user = newUser;
        //res.status(200).send("Ok");
        //res.status(200).redirect('/login');
        res.redirect('/login');

    } catch (e) {
        console.log(e);
        next(e)
    }
});

// Login: POST /login
router.post("/login", async(req, res, next) => {

    try {
        let incomingUser = req.body;
        if (!incomingUser) {

            throw new Error("Bad request");
        }

        let email = incomingUser.email;
        let userFromDB = await userDAO.getUser(email);

        if (!userFromDB) {
            throw new Error("Not found");
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
        // res.status(200);

        const data = {
            _id: userFromDB._id,
            email: userFromDB.email,
            name: userFromDB.name,
            role: userFromDB.role
        };

        let token = await jwt.sign(data, secret, { expiresIn: '1 day' });

        // res.json(token);
        console.log("token", token);

        if (token) {
          res.cookie('AuthToken', `Bearer ${token}`, {expires: new Date(Date.now() + 8 * 3600000)});  // cookie will be removed after 8 hours
          if (userFromDB.role === 'teacher') {
            res.redirect('/users/teachers');
          } else if (userFromDB.role === 'student') {
            res.redirect('/users/students');
          } else if (userFromDB.role === 'parent') {
            res.redirect('/users/parents');
          }
        };

    } catch (e) {
        //console.log("error ", e.message);
        next(e);
    }
});


router.post("/logout", async(req, res, next) => {
    res.status(404).send("User is required");
});

router.use(async(req, res, next) => {
    isLoggedIn(req, res, next);
});


// router.get('/home', async(req, res, next) => {
//   //res.render('home');
// });

// get one student by id only for teacher, teacher id should be equal student's ExternalId
router.get("/student/:id", async(req, res, next) => {
    try {
        //console.log("eq.user.role", req.user.role);
        if (req.user.role !== "teacher") {
            throw new Error("Unauthorized");
        }
        const studentId = req.params.id;
        const teacherId = req.user._id;
        const student = await userDAO.getStudentById(studentId, teacherId);
        if (!student) {
            throw new Error("Not found");
        }
        res.json(student);
    } catch (e) {
        //console.log("error ", e.message);
        next(e);
    }
});


// get one student by student email only for teacher, teacher id should be equal student's ExternalId
// {
//     "studentEmail": "level8@gmai.com"

// }
router.post("/student", async(req, res, next) => {
    try {

        if (req.user.role !== "teacher") {
            throw new Error("Unauthorized");
        }
        const studentEmail = req.body.studentEmail;
        if (!studentEmail) {
            throw new Error("Empty request");
        }

        const teacherId = req.user._id;
        const student = await userDAO.getStudentByEmail(studentEmail, teacherId);
        if (!student) {
            throw new Error("Not found");
        }
        res.json(student);

    } catch (e) {
        console.log("error ", e.message);
        next(e);
    }
});


// get all students for a teacher, authorized only for teacher, teacher id == student ExternalId
// returns list of students' emails
router.get("/allStudents", async(req, res, next) => {
    try {
        if (req.user.role !== "teacher") {
            throw new Error("Unauthorized");
        }

        const students = await userDAO.getAllStudents(req.user._id);
        console.log('students', students);
        //res.json(students);
        res.render('teachers', { students: students, user: req.user });

    } catch (e) {
        console.log("error ", e.message);
        next(e);
    }
});


//   Change Password POST /password
router.post("/password", async(req, res, next) => {
    try {
        let password = req.body.password;
        if (!password) {
            throw new Error("Password is required");
        }

        let savedHash = await bcrypt.hash(password, 10);
        const postedUser = await userDAO.updateUserPassword(
            req.user._id,
            savedHash
        );
        res.status(200).send("Ok");
    } catch (e) {
        console.log("error ", e.message);
        next(e);
    }
});



router.use(async(err, req, res, next) => {
    errorHandler(err, req, res, next);
});

module.exports = router;