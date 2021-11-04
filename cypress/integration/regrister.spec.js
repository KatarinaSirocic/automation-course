import data from "../fixtures/data.json";
import faker from "faker";
import authModule from "../models/authModule";
import validationMessages from "../fixtures/validationMessages.json";

describe("Register", () => {
  let user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  beforeEach("Visit url and choose Satrter", () => {
    cy.visit("https://cypress-api.vivifyscrum-stage.com/pricing", {
      timeout: 30000,
    });
  });
  after("Clear storage and cookies", () => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it("Register: Empty fields and checkbox not checked", () => {
    authModule.register({
      email: "",
      password: "",
      numberOfUsers: "",
      checkbox: false,
    }),
      authModule.errorMessage
        .eq(0)
        .should("have.text", validationMessages.mustBeValidEmail)
        .and("have.css", "color", "rgb(187, 57, 22)"),
      authModule.errorMessage
        .eq(1)
        .should("have.text", validationMessages.requiredPassword)
        .and("have.css", "color", "rgb(187, 57, 22)"),
      authModule.errorMessage
        .eq(2)
        .should("have.text", validationMessages.requiredNumberOfUsers)
        .and("have.css", "color", "rgb(187, 57, 22)");
    authModule.errorMessage
      .eq(3)
      .should("have.text", validationMessages.requiredTermsAndConditions)
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Register: Email more then 255 characters", () => {
    authModule.register({ email: data.invalidUser.emailMoreThen255char }),
      authModule.errorMessage
        .eq(0)
        .should("have.text", validationMessages.mustBeValidEmail)
        .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Register: No body email", () => {
    authModule.register({ email: data.invalidUser.noBodyemail }),
      authModule.errorMessage
        .eq(0)
        .should("have.text", validationMessages.mustBeValidEmail)
        .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Register: No @ sign email", () => {
    authModule.register({ email: data.invalidUser.noAtSignEmail }),
      authModule.errorMessage
        .eq(0)
        .should("have.text", validationMessages.mustBeValidEmail)
        .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Register: Invalid password", () => {
    authModule.register({ password: data.invalidUser.invalidPassword }),
      authModule.errorMessage
        .eq(1)
        .should("have.text", validationMessages.password5characters)
        .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Register: Invalid number of users", () => {
    authModule.register({
      numberOfUsers: data.invalidUser.invalidNumberOfUsers,
    }),
      authModule.errorMessage
        .eq(2)
        .should("have.text", validationMessages.invalidNumberOfUsers)
        .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Register: Valid registration", () => {
    authModule.register({});
    authModule.logout();
    authModule.login({});
    cy.wait(2000);
    authModule.finishRegister();
  });
});
