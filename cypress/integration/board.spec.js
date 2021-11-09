import authModule from "../models/authModule";
import organizationModule from "../models/organizationModule";
import boardModule from "../models/boardModule";
import navigationModule from "../models/navigationModule";

describe("CRUD Board", () => {
  before("Login and create organization", () => {
    cy.visit("/");
    cy.validLogin();
    organizationModule.createOrganization({});
  });
  after("Delete board", () => {
    boardModule.deleteBoard();
    navigationModule.myOrganizations.click();
    organizationModule.deleteOrganization();
  });

  it("Cancel create  board", () => {
    boardModule.cancelCreateBoard({});
  });

  it("Create new board", () => {
    boardModule.createBoard({});
  });
});
