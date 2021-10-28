import signUpPage from "../fixtures/signUpPage.json";
import loginPage from "../fixtures/loginPage.json";
import data from "../fixtures/data.json";
import sidebar from "../fixtures/sidebar.json";
import navigation from "../fixtures/navigation.json";

describe("Register", () => {
  beforeEach("Visit url and choose Satrter", () => {
    cy.visit("https://cypress-api.vivifyscrum-stage.com/pricing", {
      timeout: 30000,
    });
    cy.get(signUpPage.freeSignUp).click({ force: true });
  });

  it("Register: Empty email field", () => {
    cy.get(signUpPage.emailInput)
      .should("be.visible")
      .type(data.invalidUser.emptyEmail);
    cy.get(signUpPage.passwordInput).type(data.user.password);
    cy.get(signUpPage.numberOfUsersInput).type(data.user.validNmberOfUsers);
    cy.get(signUpPage.submitButton).click();
    cy.get(signUpPage.validationMessage)
      .eq(0)
      .should("have.text", "The email field must be a valid email")
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Register: Email more then 255 characters", () => {
    cy.get(signUpPage.emailInput)
      .should("be.visible")
      .type(data.invalidUser.emailMoreThen255char);
    cy.get(signUpPage.passwordInput).type(data.user.password);
    cy.get(signUpPage.numberOfUsersInput).type(data.user.validNmberOfUsers);
    cy.get(signUpPage.submitButton).click();
    cy.get(signUpPage.validationMessage)
      .eq(0)
      .should("have.text", "The email field must be a valid email")
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Register: No body email", () => {
    cy.get(signUpPage.emailInput)
      .should("be.visible")
      .type(data.invalidUser.noBodyemail);
    cy.get(signUpPage.emailInput).type(data.user.password);
    cy.get(signUpPage.numberOfUsersInput)
      .clear()
      .type(data.user.validNmberOfUsers);
    cy.get(signUpPage.submitButton).click();
    cy.get(signUpPage.validationMessage)
      .eq(0)
      .should("have.text", "The email field must be a valid email")
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Register: No @ sign email", () => {
    cy.get(signUpPage.emailInput)
      .should("be.visible")
      .type(data.invalidUser.noAtSignEmail);
    cy.get(signUpPage.emailInput).type(data.user.password);
    cy.get(signUpPage.numberOfUsersInput)
      .clear()
      .type(data.user.validNmberOfUsers);
    cy.get(signUpPage.submitButton).click();
    cy.get(signUpPage.validationMessage)
      .eq(0)
      .should("have.text", "The email field must be a valid email")
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Register: Invalid password", () => {
    cy.get(signUpPage.emailInput).should("be.visible").type(data.user.email);
    cy.get(signUpPage.passwordInput).type(data.invalidUser.invalidPassword);
    cy.get(signUpPage.numberOfUsersInput)
      .clear()
      .type(data.user.validNmberOfUsers);
    cy.get(signUpPage.submitButton).click();
    cy.get(signUpPage.validationMessage)
      .eq(1)
      .should("have.text", "The password field must be at least 5 characters")
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Register: Empty password", () => {
    cy.get(signUpPage.emailInput).should("be.visible").type(data.user.email);
    cy.get(signUpPage.passwordInput).type(data.invalidUser.emptySpacePassword);
    cy.get(signUpPage.numberOfUsersInput).type(data.user.validNmberOfUsers);
    cy.get(signUpPage.submitButton).click();
    cy.get(signUpPage.validationMessage)
      .eq(1)
      .should("have.text", "The password field is required")
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Register: Invalid Number of Users", () => {
    cy.get(signUpPage.emailInput).should("be.visible").type(data.user.email);
    cy.get(signUpPage.emailInput).type(data.user.password);
    cy.get(signUpPage.numberOfUsersInput)
      .clear()
      .type(data.invalidUser.invalidNumberOfUsers);
    cy.get(signUpPage.submitButton).click();
    cy.get(signUpPage.validationMessage)
      .eq(2)
      .should("have.text", "The number of users must be between 1 and 10")
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Register: Checkbox not checked", () => {
    cy.get(signUpPage.emailInput).should("be.visible").type(data.user.email);
    cy.get(signUpPage.emailInput).type(data.user.password);
    cy.get(signUpPage.numberOfUsersInput)
      .clear()
      .type(data.user.validNmberOfUsers);
    cy.get(signUpPage.checkbox).click();
    cy.get(signUpPage.submitButton).click();
    cy.get(signUpPage.validationMessage)
      .eq(3)
      .should(
        "have.text",
        "The agree to terms and privacy policy field is required"
      )
      .and("have.css", "color", "rgb(187, 57, 22)");
  });

  it("Register: Valid registration", () => {
    cy.get(signUpPage.emailInput).should("be.visible").type(data.user.email);
    cy.get(signUpPage.passwordInput).type(data.user.password);
    cy.get(signUpPage.numberOfUsersInput).type(data.user.validNmberOfUsers);
    cy.get(signUpPage.submitButton).click();
    cy.get(sidebar.myAccount.account).click(
      { force: true },
      { timeout: 30000 }
    );
    cy.get(sidebar.myAccount.profile).click();
    cy.get(navigation.logOutButton).click();
    cy.get(loginPage.emailInput).type(data.user.email);
    cy.get(loginPage.passwordInput).type(data.user.password);
    cy.get(loginPage.logInButton).click();
    cy.wait(2000);
    cy.get(signUpPage.firstName).type(data.accountDetails.firstName);
    cy.get(signUpPage.lastName).type(data.accountDetails.lastName);
    cy.get(signUpPage.companyName).type(data.accountDetails.companyName);
    cy.get(signUpPage.organizationName).type(
      data.accountDetails.organizationName
    );
    cy.get(signUpPage.submitButton).click();
  });
});
