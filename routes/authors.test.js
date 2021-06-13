  
const request = require("supertest");

const server = require("../server");
const testUtils = require('../test-utils');
const Authors = require('../models/author');

const testAuthors = [
  {
    name: "Margaret Atwood",
    gender: "Female",
    yearBorn: 1939
  },
  {
    name: "James Baldwin",
    gender: "Male",
    yearBorn: 1924
  },
  {
    name: "N. K. Jemisin",
    gender: "Female",
    yearBorn: 1972
  },
  {
    name: "Brandon Sanderson",
    gender: "Male",
    yearBorn: 1975
  },
];
module.exports = { testAuthors };

describe("/authors", () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  beforeEach(async () => {
    const savedAuthors = await Authors.insertMany(testAuthors);
    testAuthors.forEach((author, index) => {
      author._id = savedAuthors[index]._id.toString();
    });
  });
  afterEach(testUtils.clearDB);

  describe("GET /", () => {
    it("should return all authors", async () => {
      const res = await request(server).get("/authors");
      expect(res.statusCode).toEqual(200);
      testAuthors.forEach(author => {
        expect(res.body).toContainEqual(
          expect.objectContaining(author)
        )
      })
    });
  });
  
  describe("GET /:id", () => {
    it("should return 404 if no matching id", async () => {
      const res = await request(server).get("/authors/id1");
      expect(res.statusCode).toEqual(404);
    });

    it.each(testAuthors)("should find author # %#", async (author) => {
      const res = await request(server).get("/authors/" + author._id);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toMatchObject(author);
    })
  });

  describe("POST /", () => {
    it("should reject an author with an empty body", async () => {
      const author = {};
      const res = await request(server).post("/authors").send(author);
      expect(res.statusCode).toEqual(400);
    });

    it("should reject an author without a name", async () => {
      const author = {
        gender: 'Male',
        yearBorn: 2000
      };
      const res = await request(server).post("/authors").send(author);
      expect(res.statusCode).toEqual(400);
    });

    it("should create an author", async () => {
      const author = {
        name: 'Joel',
        gender: 'Male',
        yearBorn: 2000
      };
      const res = await request(server).post("/authors").send(author);
      expect(res.statusCode).toEqual(200);
      const { _id } = res.body;
      const savedAuthor = await Authors.findOne({ _id }).lean();
      expect(savedAuthor).toMatchObject(author);
    });
  });

  describe("PUT /:id", () => {
    it("should reject an author with an empty body", async () => {
      const { _id } = testAuthors[0];
      const res = await request(server).put("/authors/" + _id).send({});
      expect(res.statusCode).toEqual(400);
    });

    it("should reject a bad id", async () => {
      const res = await request(server).put("/authors/fake").send(testAuthors[0]);
      expect(res.statusCode).toEqual(400);
    });

    it("should update an author", async () => {
      const originalAuthor = testAuthors[2];
      const author = { ...originalAuthor };
      author.name = "Updated";
      const res = await request(server).put("/authors/" + author._id).send(author);
      expect(res.statusCode).toEqual(200);
     
      const savedAuthor = await Authors.findOne({ _id: author._id }).lean();
      savedAuthor._id = savedAuthor._id.toString();
      expect(savedAuthor).toMatchObject(author);
    });
  });

  describe("DELETE /:id", () => {
    it("should reject a bad id", async () => {
      const res = await request(server).delete("/authors/fake").send();
      expect(res.statusCode).toEqual(400);
    });

    it("should delete the expected author", async () => {
      const { _id } = testAuthors[1];
      const res = await request(server).delete("/authors/" + _id).send({});
      expect(res.statusCode).toEqual(200);
      const storedAuthor = await Authors.findOne({ _id });
      expect(storedAuthor).toBeNull();
    });
  });
});