import authModule from "../models/authModule";
import organizationModule from "../models/organizationModule";
import boardModule from "../models/boardModule";

describe("CRUD Board", () => {
  before("Login and create organization", () => {
    cy.visit("/");
    authModule.login({});
    organizationModule.createOrganization({});
  });
  after("Delete board", () => {
    boardModule.deleteBoard();
  });

  it("Cancel create  board", () => {
    boardModule.cancelCreateBoard({});
  });

  it("Create new board", () => {
    boardModule.createBoard({});
  });
});
