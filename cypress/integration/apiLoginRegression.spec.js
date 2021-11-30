import userApi from "../api/user";

describe("Api testing", () => {
  let userToken;
  before(() => {
    userApi.login({ testMessage: "Login before other tests" }).then((token) => {
      userToken = token;
    });
  });

  it("wrong email without @", () => {
    console.log(userToken);
    userApi.login({
      email: "nestogmail.com",
      statusCode: 401,
      testMessage: "wrong email without @",
    });
  });

  it("wrong email without com", () => {
    userApi.login({
      email: "nesto@gmail",
      statusCode: 401,
      testMessage: "wrong email without com",
    });
  });

  it("wrong email without infornt", () => {
    userApi.login({
      email: "@gmail.com",
      statusCode: 401,
      testMessage: "wrong email without infront",
    });
  });
  it("wrong password", () => {
    userApi.login({
      password: "444444",
      statusCode: 401,
      testMessage: "wrong epassword",
    });
  });
  it("valid login", () => {
    userApi.login({
      testMessage: "successfully logged in",
    });
  });
});
