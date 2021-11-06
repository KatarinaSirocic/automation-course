import data from "../fixtures/data.json";
import loginModule from "../models/authModule";
import authModule from "../models/authModule";
import faker from "faker";
import validationMessages from "../fixtures/validationMessages.json";

describe("Login", () => {
  let user = {
    email: faker.internet.email,
    password: faker.internet.email,
  };
  beforeEach("Visit url", () => {
    cy.visit("/", { timeout: 30000 });
  });
  after("Clear local storage and cookies", () => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it("Login: empty email and password", () => {
    authModule.login({ email: "", password: "" });
    authModule.errorMessage
      .eq(0)
      .should("have.text", validationMessages.mustBeValidEmail)
      .and("have.css", "color", "rgb(187, 57, 22)");
    authModule.errorMessage
      .eq(1)
      .should("have.text", validationMessages.requiredPassword)
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Login: No body in email", () => {
    authModule.login({ email: data.invalidUser.noBodyemail });
    authModule.errorMessage
      .should("be.visible")
      .eq(0)
      .should("contain", validationMessages.mustBeValidEmail)
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Login: No gmail.com part in email", () => {
    authModule.login({ email: data.invalidUser.noGmailEmail });
    authModule.errorMessage
      .should("be.visible")
      .eq(0)
      .should("contain", validationMessages.mustBeValidEmail)
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Login: Email more then 255 charachters", () => {
    authModule.login({ email: data.invalidUser.emailMoreThen255char });
    authModule.errorMessage
      .should("be.visible")
      .eq(0)
      .should("contain", validationMessages.mustBeValidEmail)
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Login: Email without @ character", () => {
    authModule.login({ email: data.invalidUser.noAtSignEmail });
    authModule.errorMessage
      .should("be.visible")
      .eq(0)
      .should("contain", validationMessages.mustBeValidEmail)
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Login: Wrong email, correct password", () => {
    authModule.login({ email: data.invalidUser.wrongEmail });
    authModule.mainErrorMessage
      .should("be.visible")
      .eq(0)
      .should("contain", validationMessages.wrongCombination)
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Login: Invalid password", () => {
    authModule.login({ password: data.invalidUser.invalidPassword });
    authModule.errorMessage
      .should("have.text", validationMessages.password5characters)
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Login: Wrong password", () => {
    authModule.login({ password: data.invalidUser.wrongPassword });
    authModule.mainErrorMessage
      .should("be.visible")
      .and("have.text", validationMessages.wrongCombination)
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Valid login", () => {
    authModule.login({});
  });

  it("Logout", () => {
    authModule.login({});
    authModule.logout();
    cy.url().should("contain", "/login");
  });
});
