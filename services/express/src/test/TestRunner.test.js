var mongoose = require("mongoose");

const UserTest = require("./Test_AddUser");
const TestAddress_2 = require("./Test_Address");
const TestRestaurant_3 = require("./Test_Restaurant");

describe("....TEST START....", () => {
  global.token = null;
  beforeAll((done) => {
    mongoose.connect(
      "mongodb://localhost:27017/JESTDB",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        testConnection = test;
        done();
      }
    );
  });

  afterAll((done) => {
    mongoose.connection.dropDatabase(() => {
      mongoose.connection.close(() => done());
      done();
    });
  });

  test("Testing DB Connection", () => {
    expect(testConnection).not.toBeNull();
  });

  UserTest();
  TestAddress_2();
  TestRestaurant_3();
});
