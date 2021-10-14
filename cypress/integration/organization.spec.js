import createOrganization from "../fixtures/createOrganization.json"
import loginPage from "../fixtures/loginPage.json"
import data from "../fixtures/data.json"
import navigation from "../fixtures/navigation.json"
import myOrganization from "../fixtures/myOrganizations.json"

describe("CRUD Organization", () =>{

    it("Login", ()=>{
        cy.visit("/")
        cy.get(loginPage.emailInput).type(data.user.email)
        cy.get(loginPage.passwordInput).type(data.user.password)
        cy.get(loginPage.logInButton).click()
    })

    it("Cancel create Organization", ()=>{
        cy.get(createOrganization.addNewOrganization).click()
        cy.get(createOrganization.nameInput).type(data.organization.organizationName)
        cy.get(createOrganization.nextButton).click()
        cy.get(createOrganization.xButton).click()
    })
    
    it("Create Organization", ()=>{
        cy.get(createOrganization.addNewOrganization).click()
        cy.get(createOrganization.nameInput).type(data.organization.organizationName)
        cy.get(createOrganization.nextButton).click()
        cy.get(createOrganization.nextButton).click()
        cy.get(createOrganization.okButton).click()
    })

    it("Cancel edit Organization Name", () =>{
        cy.get(navigation.myOrganizations).click()
        cy.get(myOrganization.organizationTitle).contains(data.organization.organizationName).click()
        cy.get(myOrganization.organizationTitleEditMode).type(data.organization.changedOrganizationName)
        cy.get(myOrganization.cancelChangeNameButton).click()
    })
    
    it("Edit Organization Name", () =>{
        cy.get(myOrganization.organizationTitle).contains(data.organization.organizationName).click()
        cy.get(myOrganization.organizationTitleEditMode).type(data.organization.changedOrganizationName)
        cy.get(myOrganization.confirmChangeNameButton).click()
    })
})
