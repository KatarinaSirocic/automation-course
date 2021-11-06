import data from "../fixtures/data.json";
import sideBar from "./sideBarModule";
import navigation from "./navigationModule";

module.exports = {
  get emailInput() {
    return cy.get("input[type='email']");
  },
  get passwordInput() {
    return cy.get("input[type='password']");
  },
  get submitButton() {
    return cy.get("button[type='submit']");
  },
  get forgotPasswordLink() {
    return cy.get("a[href='/forgot-password']");
  },
  get errorMessage() {
    return cy.get("span[class='el-form-item__error el-form-item-error--top']");
  },
  get mainErrorMessage() {
    return cy.get("span[class='el-form-item__error']");
  },
  get freeSignupButton() {
    return cy.get(
      ".vsp-c-pricing-plan-list.vsp-c-pricing-plan-list--annual > li:nth-of-type(1) > a[title='Starter']"
    );
  },
  get numberOfUsersInput() {
    return cy.get("input[name='number_of_users']");
  },
  get checkbox() {
    return cy.get("span[class='vs-c-checkbox-check']");
  },
  get firstName() {
    return cy.get("input[name='first_name']");
  },
  get lastName() {
    return cy.get("div[class='el-input'] > input[name='last_name']");
  },
  get companyName() {
    return cy.get("input[name='company_name']");
  },
  get organizationName() {
    return cy.get("input[name='organization_name']");
  },

  register({
    email = data.user.email,
    password = data.user.password,
    numberOfUsers = data.user.validNmberOfUsers,
    checkbox,
  }) {
    this.freeSignupButton.click({ force: true });
    if (
      email == "" &&
      password == "" &&
      numberOfUsers == "" &&
      checkbox == false
    ) {
      this.checkbox.click({ force: true });
      this.submitButton.should("be.visible").click();
    } else {
      this.emailInput.should("be.visible").type(email);
      this.passwordInput.should("be.visible").type(password);
      this.numberOfUsersInput.should("be.visible").type(numberOfUsers);
      this.submitButton.should("be.visible").click();
    }
  },

  finishRegister(
    firstName = data.accountDetails.firstName,
    lastName = data.accountDetails.lastName,
    organizationName = data.accountDetails.organizationName,
    companyName = data.accountDetails.organizationName
  ) {
    this.firstName.type(firstName);
    this.lastName.type(lastName);
    this.organizationName.type(organizationName);
    this.companyName.type(companyName);
    this.submitButton.click();
  },

  login({ email = data.user.email, password = data.user.password }) {
    if (email == "" && password == "") {
      this.submitButton.click();
    } else {
      cy.intercept("POST", "**/api/v2/login").as("login");
      this.emailInput.should("be.visible").type(email);
      this.passwordInput.should("be.visible").type(password);
      this.submitButton.click();
      if (email == data.user.email && password == data.user.password) {
        cy.wait("@login").then((intercept) => {
          expect(intercept.response.statusCode).to.eql(200);
        });
      }
    }
  },

  logout() {
    cy.intercept("POST", "**logout").as("logout");
    sideBar.myAccountButton.should("be.visible").click();
    sideBar.accountProfile.should("be.visible").click();
    navigation.logOutButton.should("be.visible").click();
    cy.wait("@logout").then((intercept) => {
      expect(intercept.response.statusCode).to.eq(201);
    });
  },
};
