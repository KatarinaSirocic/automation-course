const signUpPage = require("../fixtures/signUpPage.json")
import data from "../fixtures/data.json"
import sidebar from "../fixtures/sidebar.json"
import navigation from "../fixtures/navigation.json"
import loginPage from "../fixtures/loginPage"


describe("Login", () => {

    it("Visit url", () => {
        cy.visit("/", {timeout: 30000});
    });

    it("Login: Wrong password", () => {
        cy.get(loginPage.emailInput).clear().type(data.user.email)
        cy.get(loginPage.passwordInput).clear().type(data.invalidUser.wrongPassword)
        cy.get(loginPage.logInButton).click()
    })

    it("Login: Empty password ", () => {
        cy.get(loginPage.emailInput).clear().type(data.user.email)
        cy.get(loginPage.passwordInput).clear().type(data.invalidUser.emptySpacePassword)
        cy.get(loginPage.logInButton).click()
    })

    it("Login: Empty email field", () => {
        cy.get(loginPage.emailInput).clear().type(data.invalidUser.emptyEmail)
        cy.get(loginPage.passwordInput).clear().type(data.user.password)
        cy.get(loginPage.logInButton).click()
    })

    it("Login: Wrong email", () => {
        cy.get(loginPage.emailInput).clear().type(data.invalidUser.wrongEmail)
        cy.get(loginPage.passwordInput).clear().type(data.invalidUser.wrongEmail)
        cy.get(loginPage.logInButton).click()
    })

    it("Login: No body in email", () => {
        cy.get(loginPage.emailInput).clear().type(data.invalidUser.noBodyemail)
        cy.get(loginPage.passwordInput).clear().type(data.user.password)
        cy.get(loginPage.logInButton).click()
    })

    it("Login: No gmail.com part", () => {
        cy.get(loginPage.emailInput).clear().type(data.invalidUser.noGmailEmail)
        cy.get(loginPage.passwordInput).clear().type(data.user.password)
        cy.get(loginPage.logInButton).click()
    })

    it("Valid login", () => {
        cy.get(loginPage.emailInput).clear().type(data.user.email)
        cy.get(loginPage.passwordInput).clear().type(data.user.password)
        cy.get(loginPage.logInButton).click()

    })

    it("Logout", () => {
        cy.get(sidebar.myAccount.account).click({force: true})
        cy.get(sidebar.myAccount.profile).click()
        cy.get(navigation.logOutButton).click()
    })
})
