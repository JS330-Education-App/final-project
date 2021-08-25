const request = require('supertest');
const jwt = require('jsonwebtoken');
const server = require('../server');
const testUtils = require('../test-utils');
const User = require('../models/user');

describe('/login', () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);
  afterEach(testUtils.clearDB);

  const user0 = {
    name: 'Teacher 0',
    email: 'teacher0@mail.com',
    password: '123password',
    role: 'teacher'
  };
  const user1 = {
    name: 'Student 0',
    email: 'student0@mail.com',
    password: '456password',
    role: 'student',
    teacherEmail: 'teacher0@mail.com',
    gradeLevel: '3'
  };

  const user2 = {
    name: 'Parent 0',
    email: 'parent0@mail.com',
    password: '789password',
    role: 'parent',
    studentEmail: 'student0@mail.com'
  }

  describe('before signup', () => {
    describe('POST /', () => {
      it('should return 401', async () => {
        const res = await request(server).post('/login').send(user0);
        expect(res.statusCode).toEqual(401);
      });
    });
  
  describe('POST /password', () => {
    it('should return 401', async () => {
      const res = await request(server).post('/login/password').send(user0);
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('POST /logout', () => {
    it('should return 404', async () => {
      const res = await request(server).post('/login/logout').send();
      expect(res.statusCode).toEqual(404);
    });
  });
});

describe('signup', () => {
  describe('POST /signup', () => {
    it('should return 400 without a password', async () => {
      const res = await request(server).post('/login/signup').send({
        email: user0.email
      });
      expect(res.statusCode).toEqual(400);
    });
    it('should return 400 with empty password', async () => {
      const res = await request(server).post('/login/signup').send({
        email: user1.email,
        password: ''
      });
      expect(res.statusCode).toEqual(400);
    });
    // it('should return 200 and with a password', async () => {
    // const res = await request(server).post('/login/signup').send(user0);
    // expect(res.statusCode).toEqual(200);
    // });
    it('should redirect to /login after successful registration', async () => {
    const res = await request(server).post('/login/signup').send(user0);
    expect(res.headers.location).toEqual('/login');
    });
    it('should not store raw password', async () => {
      await request(server).post('/login/signup').send(user0);
      const users = await User.find().lean();
      users.forEach((user) => {
        expect(Object.values(user).includes(user0.password)).toBe(false);
      });
    });
    it('should return 400 for students with no teacherEmail', async () => {
      const res = await request(server).post('/login/signup').send({
        name: user1.name,
        email: user1.email,
        password: user1.password,
        role: user1.role,
        teacherEmail: ''
      });
      expect(res.statusCode).toEqual(400);
    });
    it('should return 400 for students with no gradeLevel', async () => {
      const res = await request(server).post('/login/signup').send({
        name: user1.name,
        email: user1.email,
        password: user1.password,
        role: user1.role,
        teacherEmail: user1.teacherEmail,
        gradeLevel: ''
      });
      expect(res.statusCode).toEqual(400);
    });
    it('should return 400 for parents with no studentEmail', async () => {
      const res = await request(server).post('/login/signup').send({
        name: user2.name,
        email: user2.email,
        password: user2.password,
        role: user2.role,
        studentEmail: ''
      });
      expect(res.statusCode).toEqual(400);
    });
  });
});
describe.each([user0, user1])('User %#', (user) => {
  beforeEach(async () => {
    await request(server).post('/login/signup').send(user0);
    await request(server).post('/login/signup').send(user1);
  });

  describe('POST /', () => {
    it(`should return 400 when password isn't provided`, async () => {
      const res = await request(server).post('/login').send({
        email: user.email
      });
      expect(res.statusCode).toEqual(400);
    });
    it(`should return 401 when password doesn't match`, async () => {
      const res = await request(server).post('/login').send({
        email: user.email,
        password: '123'
      });
      expect(res.statusCode).toEqual(401);
    });
    it('should return 200 and a token when password matches', async () => {
      const res = await request(server).post('/login').send(user);
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body.token).toEqual('string');
    });
    it('should not store token on user', async () => {
      const res = await request(server).post('/login').send(user);
      const token = res.body.token;
      const users = await User.find().lean();
      users.forEach((user) => {
        expect(Object.values(user)).not.toContain(token);
      });
    });
    it('should return a JWT with user email, _id, and roles inside, but not password', async () => {
      const res = await request(server).post('/login').send(user);
      const token = res.body.token;
      const decodedToken = jwt.decode(token);
      expect(decodedToken.email).toEqual(user.email);
      expect(['teacher', 'student']).toContain(decodedToken.role);
      expect(decodedToken._id).toMatch(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i); // mongo _id regex
      expect(decodedToken.password).toBeUndefined();
    });
  });
});
describe('After both users login', () => {
  let token0;
  let token1;
  beforeEach(async () => {
    await request(server).post('/login/signup').send(user0);
    const res0 = await request(server).post('/login').send(user0);
    token0 = res0.body.token;
    await request(server).post('/login/signup').send(user1);
    const res1 = await request(server).post('/login').send(user1);
    token1 = res1.body.token;
  });

  describe('POST /password', () => {
    it('should reject bogus token', async () => {
      const res = await request(server)
        .post('/login/password')
        .set('Authorization', 'Bearer BAD')
        .send({ password: '123' });
      expect(res.statusCode).toEqual(401);
    });
    it('should reject empty password', async () => {
      const res = await request(server)
        .post('/login/password')
        .set('Authorization', 'Bearer ' + token0)
        .send({ password: '' });
      expect(res.statusCode).toEqual(400);
    });
  });
});

});