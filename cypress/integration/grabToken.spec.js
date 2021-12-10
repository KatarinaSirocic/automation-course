import userApi from "../api/user";
import data from "../fixtures/data.json";

describe("Grab tokens", () => {
  let userToken = {};
  it("user login", () => {
    console.log(data.accounts);
    for (const [key, value] of Object.entries(data.accounts)) {
      userApi
        .login({
          email: value.email,
          password: value.password,
          testMessage: "Login",
        })
        .then((token) => {
          console.log(token);
          userToken[key] = token;
        });
    }
  });

  it("log", () => {
    cy.writeFile("k6/token.json", [userToken]);
  });
});
