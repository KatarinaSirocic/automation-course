import data from "../fixtures/data.json";
import navigationModule from "../models/navigationModule";
import sideBarModule from "../models/sideBarModule";
import commonModule from "../models/commonModule";

let boardID;
module.exports = {
  get addBoradButton() {
    return cy.get(
      "li[class='vs-c-my-organization__board vs-c-my-organization__board-new']"
    );
  },
  get scrumRadioButton() {
    return cy.get("input[value='scrum_board']");
  },
  get kanbanRadioButton() {
    return cy.get("input[id='kanban-board-radio']");
  },
  get configureButton() {
    return cy.get("[data-cy='board-configuration']");
  },
  get uploadBoradLogo() {
    return cy.get(
      "a[class='vs-c-btn vs-c-btn--rounded-square vs-u-width--full']"
    );
  },

  createBoard({ boardName = data.board.boardName }) {
    cy.intercept("POST", "/api/v2/boards").as("createBoard");
    navigationModule.myOrganizations.click();
    this.addBoradButton.eq(0).click({ force: true });
    commonModule.nameInput.type(boardName);
    commonModule.nextButton.click();
    this.scrumRadioButton.click({ force: true });
    commonModule.nextButton.click();
    const filePath = "../fixtures/vndly_logo.jpg";
    this.uploadBoradLogo.attachFile(filePath, { subjectType: "drag-n-drop" });
    commonModule.saveButton.click();
    commonModule.nextButton.click();
    commonModule.nextButton.click();
    cy.wait("@createBoard").then((intercept) => {
      expect(intercept.response.statusCode).to.eql(201);
      expect(intercept.response.body.name).to.eql(data.board.boardName);
      boardID = intercept.response.body.id;
    });
    //commonModule.okButton.click();
  },

  cancelCreateBoard({ boardName = data.board.boardName }) {
    navigationModule.myOrganizations.click();
    this.addBoradButton.eq(1).click({ force: true });
    commonModule.nameInput.type(boardName);
    commonModule.nextButton.click();
    this.scrumRadioButton.click({ force: true });
    commonModule.nextButton.click();
    commonModule.nextButton.click();
    commonModule.xButton.click();
  },

  deleteBoard() {
    cy.intercept("DELETE", `**/boards/${boardID}`).as("deleteBoard");
    sideBarModule.createdBoard.click();
    this.configureButton.click();
    cy.wait(2000);
    commonModule.deleteButton.click();
    commonModule.saveButton.contains("Yes").click();
    cy.statusCode("@deleteBoard", 200);
    commonModule.okButton.click();
  },
};
