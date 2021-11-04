module.exports = {
  get logOutButton() {
    return cy.get("button[class='vs-c-btn vs-c-btn--link vs-c-btn--danger']");
  },
  get myOrganizations() {
    return cy.get("div[class='vs-c-site-logo vs-u-cursor--pointer']");
  },
};
