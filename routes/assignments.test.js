// const request = require('supertest');
// const jwt = require('jsonwebtoken');
// const server = require('../server');
// const testUtils = require('../test-utils');
// const User = require('../models/user');
// const Assignments = require('../models/assignment');
// const cookieParser = require('cookie-parser');
// const express = require('express');

// const app = express();
// app.use(cookieParser());

// app.get('/', function(req, res) {
//     res.cookie('cookie', 'fakeToken');
//     res.send();
// });

// app.get('/users/login', function(req, res) {
//     if (req.cookies.cookie) res.send(req.cookies.cookie);
//     else res.send(':(');
// });

// const agent = request.agent(app);


// //Assignment Archetype.
// // title: { type: String, required: true },
// // content: { type: String, required: true },
// // teacherID: { type: mongoose.Schema.Types.ObjectId, ref: 'user', requred: true },
// // studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'user', requred: true, index: true },
// // isSubmitted: { type: Boolean, required: true },
// // grade: { type: Number },
// // dueDate: { type: Date, required: true }

// const studentUser = {
//     name: "JestTest Student",
//     password: "Jest",
//     email: "jestteststudent@test.com",
//     role: 'student',
//     teacherEmail: 'jesttestteacher@test.com',
//     gradeLevel: 4,
//     studentID: "1",
// };

// const user1 = {
//     name: 'Student 0',
//     email: 'student0@mail.com',
//     password: '456password',
//     role: 'student',
//     teacherEmail: 'teacher0@mail.com',
//     gradeLevel: '3'
// };

// const parentUser = {
//     name: "JestTest Parent",
//     password: "Jest",
//     email: "jesttestparent@test.com",
//     role: "parent",
// };
// const teacherUser = {
//     name: "JestTest Teacher",
//     password: "Jest",
//     email: "jesttestteacher@test.com",
//     role: "teacher",
//     teacherID: "1"
// };
// const testAssignment = {
//     title: "Jest Test",
//     content: "Here is a jest test.",
//     teacherID: "1",
//     studentID: "1",
//     isSubmitted: "false",
//     dueDate: "Dec 13",
//     _id: "12345"
// };

// //1. Only user as a student can submit an assignment
// describe("Verify user trying to submit assignment is a student. /", () => {
//     beforeAll(testUtils.connectDB);
//     afterAll(testUtils.stopDB);
//     afterEach(testUtils.clearDB);
//     let token0;
//     let token1;
//     beforeEach(async() => {
//         await request(server).post('/users/signup').send(studentUser);
//         const res0 = await request(server).post('/users/login').send(studentUser);
//         token0 = res0.body.token;
//         await request(server).post('/login/signup').send(user1);
//         const res1 = await request(server).post('/users/login').send(user1);
//         token1 = res1.body.token;
//     });

//     it("post student", async() => {
//         agent
//             .post('/users/login')
//             .set('Cookie', ['AuthToken=fakeToken'])
//             .send()
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//             })
//             // const res = await request(server).post("/assignments/submit").send(studentUser.role);
//         const res = await request(server).post("/assignments/submit").send({ "assignmentId": testAssignment._id });
//         expect(res.statusCode).toEqual(200);
//     })
//     it("post parent", async() => {
//         agent
//             .post('/users/login')
//             .set('Cookie', ['AuthToken=fakeToken'])
//             .send()
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//             })
//         const res = await request(server).post("/assignments/submit").send(parentUser.role);
//         expect(res.statusCode).toEqual(401);
//     })
//     it("post teacher", async() => {
//         agent
//             .post('/users/login')
//             .set('Cookie', ['AuthToken=fakeToken'])
//             .send()
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//             })
//         const res = await request(server).post("/assignments/submit").send(teacherUser.role);
//         expect(res.statusCode).toEqual(401);
//     })
// });

// //3. Only teacher assign an assignment

// describe("Ensure only Teacher can assign and assignment", () => {
//     beforeAll(testUtils.connectDB);
//     afterAll(testUtils.stopDB);
//     afterEach(testUtils.clearDB);

//     it("teacher assigning an assignment", async() => {
//         const res = await request(server).post("/assignments/").send(teacherUser.role);
//         expect(res.statusCode).toEqual(200);
//     })
//     it("student assigning an assignment", async() => {
//         const res = await request(server).post("/assignments/").send(studentUser.role);
//         expect(res.statusCode).toEqual(401);
//     })
//     it("parent assigning an assignment", async() => {
//         const res = await request(server).post("/assignments/").send(parentUser.role);
//         expect(res.statusCode).toEqual(401);
//     })
// });

// //5. Only teacher grade an assignment
// describe("Only teacher can grade an assignment", () => {
//     beforeAll(testUtils.connectDB);
//     afterAll(testUtils.stopDB);
//     afterEach(testUtils.clearDB);

//     it("teacher grading an assignment", async() => {
//         const res = await request(server).post("/assignments/grade").send(teacherUser.role);
//         expect(res.statusCode).toEqual(200);
//     })
//     it("student fails grading an assignment", async() => {
//         const res = await request(server).post("/assignments/grade").send(studentUser.role);
//         expect(res.statusCode).toEqual(401);
//     })
//     it("parent fails grading an assignment", async() => {
//         const res = await request(server).post("/assignments/grade").send(parentUser.role);
//         expect(res.statusCode).toEqual(401);
//     })
// });


// //7. Only teacher delete an assignment
// describe("Only teacher can delete an assignment", () => {
//     beforeAll(testUtils.connectDB);
//     afterAll(testUtils.stopDB);
//     afterEach(testUtils.clearDB);

//     it("teacher deleting an assignment", async() => {
//         const res = await request(server).post("/assignments/delete").send(teacherUser.role);
//         expect(res.statusCode).toEqual(200);
//     })
//     it("student fails deleting an assignment", async() => {
//         const res = await request(server).post("/assignments/delete").send(studentUser.role);
//         expect(res.statusCode).toEqual(401);
//     })
//     it("parent fails deleting an assignment", async() => {
//         const res = await request(server).post("/assignments/delete").send(parentUser.role);
//         expect(res.statusCode).toEqual(401);
//     })
// });

// //9. Only teacher create an assignment
// describe("Only teacher can create an assignment", () => {
//     beforeAll(testUtils.connectDB);
//     afterAll(testUtils.stopDB);
//     afterEach(testUtils.clearDB);

//     it("teacher creating an assignment", async() => {
//             const res = await request(server).post("/assignments/").send(teacherUser.role);
//             expect(res.statusCode).toEqual(200);
//         })
//         //10. Parent/student cannot create an assignment
//     it("student fails creating an assignment", async() => {
//         const res = await request(server).post("/assignments/").send(studentUser.role);
//         expect(res.statusCode).toEqual(401);
//     })
//     it("parent fails creating an assignment", async() => {
//         const res = await request(server).post("/assignments/").send(parentUser.role);
//         expect(res.statusCode).toEqual(401);
//     })
// });

// //11. Teacher (Student – need to confirm that student will have the option) can perform assignment search. Partial search by title and context.
// describe("Teacher can perform assignment search and partial search by title/context", () => {
//     beforeAll(testUtils.connectDB);
//     afterAll(testUtils.stopDB);
//     afterEach(testUtils.clearDB);

//     it("teacher searching an assignment", async() => {
//         const res = await request(server).get("/assignments/search").send(teacherUser.role);
//         expect(res.statusCode).toEqual(200);
//     })
//     it("student searching an assignment", async() => {
//             const res = await request(server).get("/assignments/search").send(studentUser.role);
//             expect(res.statusCode).toEqual(200);
//         })
//         //12. Parent cannot perform assignment search
//     it("parent fails searching an assignment", async() => {
//         const res = await request(server).get("/assignments/search").send(parentUser.role);
//         expect(res.statusCode).toEqual(401);
//     })
// });

// //13. Teacher can get all his assignments (for different students)
// describe("Teacher can get all assignments for different students", () => {
//     beforeAll(testUtils.connectDB);
//     afterAll(testUtils.stopDB);
//     afterEach(testUtils.clearDB);

//     it("teacher searching an assignment", async() => {
//         const res = await request(server).get("/").send(teacherUser.role);
//         expect(res.statusCode).toEqual(200);
//     })
//     it("student fails getting all teacher's assignments", async() => {
//             const res = await request(server).get("/").send(studentUser.role);
//             expect(res.statusCode).toEqual(401);
//         })
//         //12. Parent cannot perform assignment search
//     it("parent fails getting all teacher's assignments", async() => {
//         const res = await request(server).get("/").send(parentUser.role);
//         expect(res.statusCode).toEqual(401);
//     })
// });

// //14. Student can get all his/her assignments only
// describe("Student can only access their assignments", () => {
//     beforeAll(testUtils.connectDB);
//     afterAll(testUtils.stopDB);
//     afterEach(testUtils.clearDB);

//     it("student getting all their assignments", async() => {
//         const res = await request(server).get("/assignments/assignmentsForStudent").send(studentUser.role);
//         expect(res.statusCode).toEqual(200);
//     })
// });

// //15. Parent cannot get assignments only for his kid
// describe("Parent only has access to their child's assignments", () => {
//     beforeAll(testUtils.connectDB);
//     afterAll(testUtils.stopDB);
//     afterEach(testUtils.clearDB);

//     it("parent getting an assignment", async() => {
//         const res = await request(server).post("/assignments/assignmentsForParent").send(parentUser.role);
//         expect(res.statusCode).toEqual(200);
//     })
// });

// //16. User should be able to get an average grade by student id (user role doesn’t matter)
// describe("Any user can get average grade by student id", () => {
//     beforeAll(testUtils.connectDB);
//     afterAll(testUtils.stopDB);
//     afterEach(testUtils.clearDB);

//     it("teacher getting an assignment average grade for user", async() => {
//         const res = await request(server).get("/student/grades/:id").send(teacherUser.role);
//         expect(res.statusCode).toEqual(200);
//     })
//     it("student getting an assignment average grade for user", async() => {
//         const res = await request(server).get("/student/grades/:id/").send(studentUser.role);
//         expect(res.statusCode).toEqual(200);
//     })
//     it("parent getting an assignment average grade for user", async() => {
//         const res = await request(server).get("/student/grades/:id/").send(parentUser.role);
//         expect(res.statusCode).toEqual(200);
//     })
// });

// //17. Teacher/Student can get an assignment by id
// describe("Teacher/student can get an assignment by id", () => {
//     beforeAll(testUtils.connectDB);
//     afterAll(testUtils.stopDB);
//     afterEach(testUtils.clearDB);

//     it("teacher getting an assignment by id", async() => {
//         const res = await request(server).get("/assignments/:id").send(teacherUser.role);
//         expect(res.statusCode).toEqual(200);
//     })
//     it("student getting an assignment by id", async() => {
//         const res = await request(server).get("/assignments/:id").send(studentUser.role);
//         expect(res.statusCode).toEqual(200);
//     })
//     it("parent cannot get an assignment by id", async() => {
//         const res = await request(server).get("/assignments/:id").send(parentUser.role);
//         expect(res.statusCode).toEqual(401);
//     })
// });