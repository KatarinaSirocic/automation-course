module.exports = {
  get nameInput() {
    return cy.get("input[name='name']");
  },
  get deleteButton() {
    return cy.get(
      "button[class='vs-c-btn vs-c-btn--warning vs-c-btn--spaced']"
    );
  },
  get cancelButton() {
    return cy.get("button[name='prev_btn']");
  },
  get nextButton() {
    return cy.get("button[name='next_btn']");
  },
  get okButton() {
    return cy.get(
      "button[class='vs-c-btn vs-c-btn--primary vs-c-btn--lg vs-u-font-sm vs-c-modal--features-confirm-button']"
    );
  },
  get password() {
    return cy.get("input[type='password']");
  },
  get saveButton() {
    return cy.get("button[name='save-btn']");
  },
  get submitButton() {
    return cy.get("button[type='submit']");
  },
  get xButton() {
    return cy.get("button[name='close-new-board-modal-btn']");
  },
};
