const signUpPage = require("../fixtures/signUpPage.json");
import data from "../fixtures/data.json";
import sidebar from "../fixtures/sidebar.json";
import navigation from "../fixtures/navigation.json";
import loginPage from "../fixtures/loginPage";

describe("Login", () => {
  beforeEach("Visit url", () => {
    cy.visit("/", { timeout: 30000 });
  });

  it("Login: Invalid password", () => {
    cy.get(loginPage.emailInput).type(data.user.email);
    cy.get(loginPage.passwordInput).type(data.invalidUser.invalidPassword);
    cy.get(loginPage.logInButton).click();
    cy.get(signUpPage.validationMessage)
      .eq(1)
      .should("have.text", "The password field must be at least 5 characters")
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Login: Wrong password", () => {
    cy.get(loginPage.emailInput).type(data.user.email);
    cy.get(loginPage.passwordInput).type(data.invalidUser.wrongPassword);
    cy.get(loginPage.logInButton).click();
    cy.get(loginPage.emailPassCombinationIncorrect)
      .should("have.text", "Oops! Your email/password combination is incorrect")
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Login: Empty password ", () => {
    cy.get(loginPage.emailInput).type(data.user.email);
    cy.get(loginPage.passwordInput).type(data.invalidUser.emptySpacePassword);
    cy.get(loginPage.logInButton).click();
    cy.get(signUpPage.validationMessage)
      .eq(1)
      .should("have.text", "The password field is required")
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Login: Empty email field", () => {
    cy.get(loginPage.emailInput).type(data.invalidUser.emptyEmail);
    cy.get(loginPage.passwordInput).type(data.user.password);
    cy.get(loginPage.logInButton).click();
    cy.get(signUpPage.validationMessage)
      .eq(0)
      .should("have.text", "The email field must be a valid email")
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Login: Wrong email", () => {
    cy.get(loginPage.emailInput).type(data.invalidUser.wrongEmail);
    cy.get(loginPage.passwordInput).type(data.user.password);
    cy.get(loginPage.logInButton).click();
    cy.get(loginPage.emailPassCombinationIncorrect)
      .should("have.text", "Oops! Your email/password combination is incorrect")
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Login: No body in email", () => {
    cy.get(loginPage.emailInput).type(data.invalidUser.noBodyemail);
    cy.get(loginPage.passwordInput).type(data.user.password);
    cy.get(loginPage.logInButton).click();
    cy.get(signUpPage.validationMessage)
      .eq(0)
      .should("have.text", "The email field must be a valid email")
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Login: No gmail.com part", () => {
    cy.get(loginPage.emailInput).type(data.invalidUser.noGmailEmail);
    cy.get(loginPage.passwordInput).type(data.user.password);
    cy.get(loginPage.logInButton).click();
    cy.get(signUpPage.validationMessage)
      .eq(0)
      .should("have.text", "The email field must be a valid email")
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Valid login and logout", () => {
    cy.get(loginPage.emailInput).type(data.user.email);
    cy.get(loginPage.passwordInput).type(data.user.password);
    cy.get(loginPage.logInButton).click();
    cy.get(sidebar.myAccount.account).click({ force: true });
    cy.get(sidebar.myAccount.profile).click();
    cy.get(navigation.logOutButton).should("contain", "Log Out");
    cy.get(navigation.logOutButton).click();
  });
});
