import data from "../fixtures/data.json";
import navigationModule from "./navigationModule";
import commonModule from "../models/commonModule";
let organizationID;

module.exports = {
  get addNewOrganizationCard() {
    return cy.get(
      "div[class='vs-c-my-organization vs-c-my-organization--add-new not-sortable']"
    );
  },
  get organizationTitle() {
    return cy.get("h2[class='vs-c-my-organization__title']");
  },
  get getOrganization() {
    return cy.get(".vs-c-list__btn.vs-c-list__organisation");
  },
  get updateMessage() {
    return cy.get("div[class='el-message']");
  },
  get configureButton() {
    return cy.get("[data-cy='organization-configuration']");
  },

  createOrganization({ nameInput = data.organization.organizationName }) {
    cy.intercept("POST", "**/organizations").as("createOrganization");
    this.addNewOrganizationCard.click();
    commonModule.nameInput.type(nameInput);
    commonModule.nextButton.click();
    commonModule.nextButton.click();
    cy.wait("@createOrganization").then((intercept) => {
      expect(intercept.response.statusCode).to.eql(200);
      organizationID = intercept.response.body.id;
    });
    commonModule.okButton.click();
  },

  cancelCreateOrganization({ nameInput = data.organization.organizationName }) {
    this.addNewOrganizationCard.click();
    commonModule.nameInput.type(nameInput);
    commonModule.nextButton.click();
    commonModule.cancelButton.click();
  },

  editOrganization() {
    cy.intercept("PUT", `**/organizations/${organizationID}`).as(
      "editOrganization"
    );
    console.log(organizationID);
    navigationModule.myOrganizations.click();
    this.getOrganization.eq(1).click();
    commonModule.okButton.click();
    this.configureButton.click();
    commonModule.nameInput
      .clear()
      .type(data.organization.changedOrganizationName);
    commonModule.submitButton.eq(0).click();
    cy.wait(2000);

    cy.statusCode("@editOrganization", 200);
  },

  deleteOrganization() {
    cy.intercept("POST", `**/organizations/${organizationID}`).as(
      "deleteOrganization"
    );
    this.getOrganization.eq(1).click();
    this.configureButton.click();
    commonModule.deleteButton.click();
    commonModule.password.type(data.user.password);
    commonModule.saveButton.contains("Yes").click();
    cy.statusCode("@deleteOrganization", 201);
  },
};
