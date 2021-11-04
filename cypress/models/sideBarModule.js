module.exports = {
  get myAccountButton() {
    return cy.get("img[class='vs-u-img--round vs-c-user-avatar']");
  },
  get accountProfile() {
    return cy.get('[data-cy="account-profile"]');
  },
  get organizationTitle() {
    return cy.get("span[class='vs-c-list__oragnisation-item'] > span");
  },
  get createdBoard() {
    return cy.get(
      "ul[class='vs-c-list vs-c-list--boards'] > li[class='vs-c-list__item vs-c-list__item-board']"
    );
  },
};
