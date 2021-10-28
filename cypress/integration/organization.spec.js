import createOrganization from "../fixtures/createOrganization.json";
import loginPage from "../fixtures/loginPage.json";
import data from "../fixtures/data.json";
import navigation from "../fixtures/navigation.json";
import myOrganizations from "../fixtures/myOrganizations.json";
import sidebar from "..//fixtures/sidebar.json";
import createBoard from "..//fixtures/createBoard.json";

describe("CRUD Organization", () => {
  beforeEach("Login", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).type(data.user.email);
    cy.get(loginPage.passwordInput).type(data.user.password);
    cy.get(loginPage.logInButton).click();
  });

  it("Cancel create Organization", () => {
    cy.get(createOrganization.addNewOrganization).click();
    cy.get(createOrganization.nameInput).type(
      data.organization.organizationName
    );
    cy.get(createOrganization.nextButton).click();
    cy.get(createOrganization.xButton).click();
  });

  it("Create Organization", () => {
    cy.get(createOrganization.addNewOrganization).click();
    cy.get(createOrganization.nameInput).type(
      data.organization.organizationName
    );
    cy.get(createOrganization.nextButton).click();
    cy.get(createOrganization.nextButton).click();
    cy.get(createOrganization.okButton).click();
    cy.get(navigation.myOrganizations).click();
    cy.get(myOrganizations.organizationTitle)
      .eq(1)
      .should("have.text", data.organization.organizationName);
    cy.get(sidebar.organizations.getCreatedOrganization)
      .eq(1)
      .should("contain", data.organization.organizationName);
  });

  it("Cancel edit Organization Name", () => {
    cy.get(navigation.myOrganizations).click();
    cy.get(myOrganizations.organizationTitle)
      .contains(data.organization.organizationName)
      .click();
    cy.get(myOrganizations.organizationTitleEditMode).type(
      data.organization.changedOrganizationName
    );
    cy.get(myOrganizations.cancelChangeNameButton).click();
    cy.get(myOrganizations.organizationTitle)
      .eq(1)
      .should("have.text", data.organization.organizationName);
    cy.get(sidebar.organizations.getCreatedOrganization)
      .eq(1)
      .should("contain", data.organization.organizationName);
  });

  it("Edit Organization Name", () => {
    cy.get(myOrganizations.organizationTitle)
      .contains(data.organization.organizationName)
      .click();
    cy.get(myOrganizations.organizationTitleEditMode)
      .clear()
      .type(data.organization.changedOrganizationName);
    cy.get(myOrganizations.confirmChangeNameButton).click();
    cy.get(myOrganizations.organizationTitle)
      .eq(1)
      .should("have.text", data.organization.changedOrganizationName);
    cy.get(sidebar.organizations.getCreatedOrganization)
      .eq(1)
      .should("have.text", data.organization.changedOrganizationName);
  });
});
