import createOrganization from "../fixtures/createOrganization.json";
import loginPage from "../fixtures/loginPage.json";
import data from "../fixtures/data.json";
import navigation from "../fixtures/navigation.json";
import myOrganizations from "../fixtures/myOrganizations.json";
import createBoard from "../fixtures/createBoard.json";
import sidebar from "..//fixtures/sidebar.json";

describe("CRUD Board", () => {
  let boardID;
  beforeEach("Login and get organization", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).type(data.user.email);
    cy.get(loginPage.passwordInput).type(data.user.password);
    cy.get(loginPage.logInButton).click();
    cy.get(navigation.myOrganizations).click();
    cy.get(myOrganizations.organizationAvatar).eq(0).click();
  });

  it("Cancel create new board", () => {
    cy.get(createOrganization.okButton).click();
    cy.get(createBoard.addNewBoard).click();
    cy.get(createBoard.nameInput).type(data.board.boardName);
    cy.get(createBoard.nextButton).click();
    cy.get(createBoard.scrumRadioButton).click({ force: true });
    cy.get(createBoard.nextButton).click();
    cy.get(createBoard.nextButton).click();
    cy.get(createBoard.xButton).click();
  });

  it("Create new board", () => {
    cy.intercept("POST", "/api/v2/boards").as("createBoard");
    cy.get(createBoard.addNewBoard).click({ force: true });
    cy.get(createBoard.nameInput).type(data.board.boardName);
    cy.get(createBoard.nextButton).click();
    cy.get(createBoard.scrumRadioButton).click({ force: true });
    cy.get(createBoard.nextButton).click();
    cy.get(createBoard.nextButton).click();
    cy.get(createBoard.nextButton).click();
    cy.get(createOrganization.okButton).click();
    cy.wait(3000);
    cy.get(navigation.boardName).should("contain", data.board.boardName);
    cy.wait("@createBoard").then((intercept) => {
      boardID = intercept.response.body.id;
    });
  });

  it("Edit board details", () => {
    cy.intercept("PUT", `/api/v2/boards/${boardID}`).as("updateBoard");
    cy.get(createOrganization.okButton).click();
    cy.get(sidebar.organizations.boardList).children().eq(0).click();
    cy.get(
      createBoard.boradSideMenu.configureBoard.configureBoardButton
    ).click();
    cy.get(
      createBoard.boradSideMenu.configureBoard.configureBoardButton
    ).click();
    cy.get(createBoard.boradSideMenu.configureBoard.boardTitleInput)
      .clear()
      .type(data.board.changedBoardName);
    cy.get(createBoard.boradSideMenu.configureBoard.boardCodeInput)
      .clear()
      .type(data.board.boardCode);
    cy.get(createBoard.boradSideMenu.configureBoard.boradDescription)
      .clear()
      .type(data.board.boardDescription);
    cy.get(createBoard.boradSideMenu.configureBoard.updateBoardButton).click({
      force: true,
    });
    cy.wait("@updateBoard").then((response) => {
      expect(response.request.body.name).to.eq(data.board.changedBoardName);
      expect(response.request.body.code).to.eq(data.board.boardCode);
      expect(response.request.body.desciption).to.eq(
        data.board.boardDescription
      );
    });
  });

  it("Cancel delete board", () => {
    cy.get(createOrganization.okButton).click();
    cy.get(sidebar.organizations.boardList).children().eq(0).click();
    cy.get(
      createBoard.boradSideMenu.configureBoard.configureBoardButton
    ).click();
    cy.get(createBoard.boradSideMenu.configureBoard.deleteButton).click();
    cy.get(createBoard.boradSideMenu.configureBoard.cancelButton).click();
  });

  it("Delete board", () => {
    cy.get(createOrganization.okButton).click();
    cy.get(sidebar.organizations.boardList).children().eq(0).click();
    cy.get(
      createBoard.boradSideMenu.configureBoard.configureBoardButton
    ).click();
    cy.get(createBoard.boradSideMenu.configureBoard.deleteButton).click();
    cy.get(createBoard.boradSideMenu.configureBoard.saveButton).click();
  });
});
