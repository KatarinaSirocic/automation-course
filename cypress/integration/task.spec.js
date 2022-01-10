import data from "../fixtures/data.json";
import authModule from "../models/authModule";
import orgModule from "../models/organizationModule";
import boradModule from "../models/boardModule";
import taskModule from "../models/taskModule";

describe("CRUD task", () => {
  before("Login and Create organizationa and a board", () => {
    cy.visit("/");
    cy.validLogin();
    orgModule.createOrganization({});
    boradModule.createBoard({});
  });

  it("Create task", () => {
    taskModule.createTask({});
  });
});
