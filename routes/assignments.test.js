const request = require('supertest');
const jwt = require('jsonwebtoken');
const server = require('../server');
const testUtils = require('../test-utils');
const User = require('../models/user');
const Assignments = require('../models/assignment');

//Assignment Archetype.
// title: { type: String, required: true },
// content: { type: String, required: true },
// teacherID: { type: mongoose.Schema.Types.ObjectId, ref: 'user', requred: true },
// studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'user', requred: true, index: true },
// isSubmitted: { type: Boolean, required: true },
// grade: { type: Number },
// dueDate: { type: Date, required: true }

const studentUser = {
  name: "JestTest Student",
  password: "Jest",
  email: "jestteststudent@test.com",
  role: 'student',
  teacherEmail: 'jesttestteacher@test.com',
  gradeLevel: 4,
  studentID: "1",
};

const user1 = {
    name: 'Student 0',
    email: 'student0@mail.com',
    password: '456password',
    role: 'student',
    teacherEmail: 'teacher0@mail.com',
    gradeLevel: '3'
};

const parentUser = {
  name: "JestTest Parent",
  password: "Jest",
  email: "jesttestparent@test.com",
  role: "parent",
};
const teacherUser = {
  name: "JestTest Teacher",
  password: "Jest",
  email: "jesttestteacher@test.com",
  role: "teacher",
  teacherID: "1"
};
const testAssignment = {
  title: "Jest Test",
  content: "Here is a jest test.",
  teacherID: "1",
  studentID: "1",
  isSubmitted: "false",
  dueDate: "Dec 13"
};

//1. Only user as a student can submit an assignment
describe("Verify user trying to submit assignment is a student. /", ()=> {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);
  afterEach(testUtils.clearDB);
  it("post student", async () => {
    const res = await request(server).post("/assignments/submit").send(studentUser.role);
    expect(res.statusCode).toEqual(200);
  })
  it("post parent", async () => {
    const res = await request(server).post("/assignments/submit").send(parentUser.role);
    expect(res.statusCode).toEqual(401);
  })
  it("post teacher", async () => {
    const res = await request(server).post("/assignments/submit").send(teacherUser.role);
    expect(res.statusCode).toEqual(401);
  })
});

//3. Only teacher assign an assignment

describe("Ensure only Teacher can assign and assignment", () =>{
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);
  afterEach(testUtils.clearDB);

  it("teacher assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(teacherUser.role);
    expect(res.statusCode).toEqual(200);
  })
  it("student assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(studentUser.role);
    expect(res.statusCode).toEqual(401);
  })
  it("parent assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(parentUser.role);
    expect(res.statusCode).toEqual(401);
  })
});

//5. Only teacher grade an assignment
describe("Only teacher can grade an assignment", () =>{
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);
  afterEach(testUtils.clearDB);

  it("teacher assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(teacherUser.role);
    expect(res.statusCode).toEqual(200);
  })
  it("student assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(studentUser.role);
    expect(res.statusCode).toEqual(401);
  })
  it("parent assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(parentUser.role);
    expect(res.statusCode).toEqual(401);
  })
});

//6. Parent/student cannot grade an assignment

//7. Only teacher delete an assignment
describe("Only teacher can delete an assignment", () =>{
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);
  afterEach(testUtils.clearDB);

  it("teacher deleting an assignment", async () => {
    const res = await request(server).post("/assignments/delete").send(teacherUser.role);
    expect(res.statusCode).toEqual(200);
  })
  it("student deleting an assignment", async () => {
    const res = await request(server).post("/assignments/delete").send(studentUser.role);
    expect(res.statusCode).toEqual(401);
  })
  it("parent deleting an assignment", async () => {
    const res = await request(server).post("/assignments/delete").send(parentUser.role);
    expect(res.statusCode).toEqual(401);
  })
});

//9. Only teacher create an assignment

describe("Only teacher can create an assignment", () =>{
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);
  afterEach(testUtils.clearDB);

  it("teacher assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(teacherUser.role);
    expect(res.statusCode).toEqual(200);
  })
//10. Parent/student cannot create an assignment
  it("student assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(studentUser.role);
    expect(res.statusCode).toEqual(401);
  })
  it("parent assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(parentUser.role);
    expect(res.statusCode).toEqual(401);
  })
});

//11. Teacher (Student – need to confirm that student will have the option) can perform assignment search. Partial search by title and context.

describe("Teacher can perform assignment search and partial search by title/context", () =>{
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);
  afterEach(testUtils.clearDB);

  it("teacher assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(teacherUser.role);
    expect(res.statusCode).toEqual(200);
  })
  it("student assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(studentUser.role);
    expect(res.statusCode).toEqual(401);
  })
  it("parent assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(parentUser.role);
    expect(res.statusCode).toEqual(401);
  })
});

//12. Parent cannot perform assignment search


//13. Teacher can get all his assignments (for different students)

describe("Teacher can get all assignments for different students", () =>{
  test("Here is a test", () => {
    expect().toBe(undefined);
  });
});

//14. Student can get all his/her assignments only

describe("Student can only access their assignments", () =>{
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);
  afterEach(testUtils.clearDB);

  it("teacher assigning an assignment", async () => {
    const res = await request(server).post("/assignments/assignmentsForStudent").send(teacherUser.role);
    expect(res.statusCode).toEqual(200);
  })
  it("student assigning an assignment", async () => {
    const res = await request(server).post("/assignments/assignmentsForStudent").send(studentUser.role);
    expect(res.statusCode).toEqual(401);
  })
  it("parent assigning an assignment", async () => {
    const res = await request(server).post("/assignments/assignmentsForStudent").send(parentUser.role);
    expect(res.statusCode).toEqual(401);
  })
});

//15. Parent cannot get assignments only for his kid

describe("Parent only has access to their child's assignments", () =>{
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);
  afterEach(testUtils.clearDB);

  it("teacher assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(teacherUser.role);
    expect(res.statusCode).toEqual(200);
  })
  it("student assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(studentUser.role);
    expect(res.statusCode).toEqual(401);
  })
  it("parent assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(parentUser.role);
    expect(res.statusCode).toEqual(401);
  })
});

//16. User should be able to get an average grade by student id (user role doesn’t matter)

describe("Any user can get average grade by student id", () =>{
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);
  afterEach(testUtils.clearDB);

  it("teacher assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(teacherUser.role);
    expect(res.statusCode).toEqual(200);
  })
  it("student assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(studentUser.role);
    expect(res.statusCode).toEqual(401);
  })
  it("parent assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(parentUser.role);
    expect(res.statusCode).toEqual(401);
  })
});

//17. Teacher/Student can get an assignment by id

describe("Teacher/student can get an assignment by id", () =>{
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);
  afterEach(testUtils.clearDB);

  it("teacher assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(teacherUser.role);
    expect(res.statusCode).toEqual(200);
  })
  it("student assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(studentUser.role);
    expect(res.statusCode).toEqual(401);
  })
  it("parent assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(parentUser.role);
    expect(res.statusCode).toEqual(401);
  })
});

//18. Parent cannot get an assignment by id

describe("Parent cannot get an assignment by id", () =>{
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);
  afterEach(testUtils.clearDB);

  it("teacher assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(teacherUser.role);
    expect(res.statusCode).toEqual(200);
  })
  it("student assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(studentUser.role);
    expect(res.statusCode).toEqual(401);
  })
  it("parent assigning an assignment", async () => {
    const res = await request(server).post("/assignments/").send(parentUser.role);
    expect(res.statusCode).toEqual(401);
  })
});
