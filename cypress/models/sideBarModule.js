module.exports = {
  get myAccountButton() {
    return cy.get("img[class='vs-u-img--round vs-c-user-avatar']");
  },
  get accountProfile() {
    return cy.get('[data-cy="account-profile"]');
  },
};
