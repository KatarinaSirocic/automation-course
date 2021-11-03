module.exports = {
  get logOutButton() {
    return cy.get("button[class='vs-c-btn vs-c-btn--link vs-c-btn--danger']");
  },
  get myOrganizations() {
    return cy.get("img[class='vs-c-site-sign");
  },
};
