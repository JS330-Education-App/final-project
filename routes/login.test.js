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
    email: 'user0@mail.com',
    password: '123password'
  };
  const user1 = {
    email: 'user1@mail.com',
    password: '456password'
  };

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

  });
});

});