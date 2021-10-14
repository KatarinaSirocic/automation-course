import signUpPage from "../fixtures/signUpPage.json"
import loginPage from "../fixtures/loginPage.json"
import data from "../fixtures/data.json"
import sidebar from "../fixtures/sidebar.json"
import navigation from "../fixtures/navigation.json"

describe("Register", () =>{

    it("visit url", () =>{
        cy.visit("https://cypress-api.vivifyscrum-stage.com/pricing", {timeout: 30000});
    });

    it("Choose Starter", () =>{
        cy.get(signUpPage.freeSignUp).click({force:true})
    });

    it("Register: Empty email field", () =>{
        cy.get(signUpPage.emailInput).should('be.visible').type(data.invalidUser.emptyEmail)
        cy.get(signUpPage.passwordInput).type(data.user.password)
        cy.get(signUpPage.numberOfUsersInput).type(data.user.validNmberOfUsers)
        cy.get(signUpPage.submitButton).click()
    })

    it("Register: Email more then 255 characters", () =>{
        cy.get(signUpPage.emailInput).should('be.visible').type(data.invalidUser.emailMoreThen255char)
        cy.get(signUpPage.passwordInput).type(data.user.password)
        cy.get(signUpPage.numberOfUsersInput).type(data.user.validNmberOfUsers)
        cy.get(signUpPage.submitButton).click()
    })

    it("Register: No body email", () =>{
        cy.get(signUpPage.emailInput).clear().type(data.invalidUser.noBodyemail)
        cy.get(signUpPage.emailInput).clear().type(data.user.password)
        cy.get(signUpPage.numberOfUsersInput).clear().type(data.user.validNmberOfUsers)
        cy.get(signUpPage.submitButton).click()
    })

    it("Register: No @ sign email", () =>{
        cy.get(signUpPage.emailInput).clear().type(data.invalidUser.noAtSignEmail)
        cy.get(signUpPage.emailInput).clear().type(data.user.password)
        cy.get(signUpPage.numberOfUsersInput).clear().type(data.user.validNmberOfUsers)
        cy.get(signUpPage.submitButton).click()
    })

    it("Register: Invalid password", () =>{
        cy.get(signUpPage.emailInput).clear().type(data.user.email)
        cy.get(signUpPage.emailInput).clear().type(data.invalidUser.wrongPassword)
        cy.get(signUpPage.numberOfUsersInput).clear().type(data.user.validNmberOfUsers)
        cy.get(signUpPage.submitButton).click()
    })

    it("Register: Empty password", () =>{
        cy.get(signUpPage.emailInput).clear().type(data.user.email)
        cy.get(signUpPage.emailInput).clear().type(data.invalidUser.emptySpacePassword)
        cy.get(signUpPage.numberOfUsersInput).clear().type(data.user.validNmberOfUsers)
        cy.get(signUpPage.submitButton).click()
    })

    it("Register: Invalid Number of Users", () =>{
        cy.get(signUpPage.emailInput).clear().type(data.user.email)
        cy.get(signUpPage.emailInput).clear().type(data.user.password)
        cy.get(signUpPage.numberOfUsersInput).clear().type(data.invalidUser.invalidNumberOfUsers)
        cy.get(signUpPage.submitButton).click()
    })

    it("Register: Checkbox not checked", () =>{
        cy.get(signUpPage.emailInput).clear().type(data.user.email)
        cy.get(signUpPage.emailInput).clear().type(data.user.password)
        cy.get(signUpPage.numberOfUsersInput).clear().type(data.user.validNmberOfUsers)
        cy.get(signUpPage.checkbox).click()
        cy.get(signUpPage.submitButton).click()
    })

    it("Register: Valid registration", () =>{
        cy.get(signUpPage.emailInput).should('be.visible').clear().type(data.user.email)
        cy.get(signUpPage.passwordInput).clear().type(data.user.password)
        cy.get(signUpPage.numberOfUsersInput).clear().type(data.user.validNmberOfUsers)
        cy.get(signUpPage.checkbox).click()
        cy.get(signUpPage.submitButton).click()
        cy.get(sidebar.myAccount.account).click({force: true})
        cy.get(sidebar.myAccount.profile).click()
        cy.get(navigation.logOutButton).click()
        cy.get(loginPage.emailInput).type(data.user.email)
        cy.get(loginPage.passwordInput).type(data.user.password)
        cy.get(loginPage.logInButton).click()
        cy.wait(2000)
        cy.get(signUpPage.firstName).type(data.accountDetails.firstName)
        cy.get(signUpPage.lastName).type(data.accountDetails.lastName)
        cy.get(signUpPage.companyName).type(data.accountDetails.companyName)
        cy.get(signUpPage.organizationName).type(data.accountDetails.organizationName)
        cy.get(signUpPage.submitButton).click()
    })
})
