import data from "../fixtures/data.json";
import authModule from "../models/authModule";
import navigationModule from "../models/navigationModule";
import sideBarModule from "../models/sideBarModule";
import organizationModule from "../models/organizationModule";
import validationMessages from "../fixtures/validationMessages.json";

describe("CRUD Organization", () => {
  beforeEach("Login", () => {
    cy.visit("/");
    authModule.login({});
  });

  it("Cancel Create Organization", () => {
    organizationModule.cancelCreateOrganization({});
  });

  it("Create Organization", () => {
    organizationModule.createOrganization({});
    navigationModule.myOrganizations.click();
    organizationModule.organizationTitle
      .eq(1)
      .should("have.text", data.organization.organizationName);
    sideBarModule.organizationTitle
      .eq(1)
      .should("contain", data.organization.organizationName);
  });

  it("Edit Organization", () => {
    organizationModule.editOrganization({});
    organizationModule.updateMessage.should(
      "have.text",
      validationMessages.organizationUpdated
    );
    navigationModule.myOrganizations.click();
    organizationModule.organizationTitle
      .eq(1)
      .should("have.text", data.organization.changedOrganizationName);
  });

  // after("Delete created Organization", () => {
  //   cy.visit("/my-organizations");
  //   organizationModule.deleteOrganization();
  // });
});
