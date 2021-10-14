import createOrganization from "../fixtures/createOrganization.json"
import loginPage from "../fixtures/loginPage.json"
import data from "../fixtures/data.json"
import navigation from "../fixtures/navigation.json"
import myOrganizations from "../fixtures/myOrganizations.json"
import createBoard from "../fixtures/createBoard.json"

describe("CRUD Board", ()=>{

    it("Login", ()=>{
        cy.visit("/")
        cy.get(loginPage.emailInput).type(data.user.email)
        cy.get(loginPage.passwordInput).type(data.user.password)
        cy.get(loginPage.logInButton).click()
    })

    it("Go to board creation", ()=>{
        cy.get(navigation.myOrganizations).click()
        cy.get(myOrganizations.organizationAvatar).click()
    })

    it("Cancel create new board",()=>{
        cy.get(createOrganization.okButton).click()
        cy.get(createBoard.addNewBoard).click()
        cy.get(createBoard.nameInput).type(data.board.boardName)
        cy.get(createBoard.nextButton).click()
        cy.get(createBoard.scrumRadioButton).click({force: true})
        cy.get(createBoard.nextButton).click()
        cy.get(createBoard.nextButton).click()
        cy.get(createBoard.xButton).click()
    })

    it("Create new board",()=>{
        cy.get(createBoard.addNewBoard).click()
        cy.get(createBoard.nameInput).type(data.board.boardName)
        cy.get(createBoard.nextButton).click()
        cy.get(createBoard.scrumRadioButton).click({force: true})
        cy.get(createBoard.nextButton).click()
        cy.get(createBoard.nextButton).click()
        cy.get(createBoard.nextButton).click()
    })

    it("Edit board details",()=>{
        cy.get(createBoard.boradSideMenu.configureBoard.configureBoardButton).click()
        cy.get(createBoard.boradSideMenu.configureBoard.boardTitleInput).clear().type(data.board.changedBoardName)
        cy.get(createBoard.boradSideMenu.configureBoard.boardCodeInput).clear().type(data.board.boardCode)
        cy.get(createBoard.boradSideMenu.configureBoard.boradDescription).clear().type(data.board.boardDescription)
        cy.get(createBoard.boradSideMenu.configureBoard.updateBoardButton).click({force: true})
    })

    it("Cancel delete board",()=>{
        cy.get(createBoard.boradSideMenu.configureBoard.deteleBoardButton).click()
        cy.get(createBoard.boradSideMenu.configureBoard.cancelButton).click()
    })

    it("Delete board",()=>{
        cy.get(createBoard.boradSideMenu.configureBoard.deteleBoardButton).click()
        cy.get(createBoard.boradSideMenu.configureBoard.saveButton).click()
        cy.get(createOrganization.okButton).click()
    })
})
