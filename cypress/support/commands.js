import data from "../fixtures/data.json";
import authModule from "../models/authModule";
import "cypress-file-upload";

Cypress.Commands.add("statusCode", (alias, statusCode) => {
  cy.wait(alias).then((intercept) => {
    expect(intercept.response.statusCode).to.eql(statusCode);
  });
});

Cypress.Commands.add(
  "validLogin",
  (username = data.user.email, password = data.user.password) => {
    cy.intercept("POST", "**/api/v2/login").as("login");
    authModule.emailInput.type(username);
    authModule.passwordInput.type(password);
    authModule.submitButton.click();
    cy.wait("@login").then((intercept) => {
      expect(intercept.response.statusCode).to.eql(200);
    });
  }
);
