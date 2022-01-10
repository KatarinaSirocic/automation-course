import env from "../configFiles/api.json";
import data from "../fixtures/data.json";
const apiEnv = env.baseUrl;

let taskId;

module.exports = {
  get taskList() {
    return cy.get("div[class='vs-c-task-list']");
  },
  get taskFooter() {
    return cy.get("div[class='vs-c-item-card__footer']");
  },
  get newTaskButton() {
    return cy.get(".vs-add-new-task-to-top .vs-c-btn--themify-secondary");
  },
  get taskNameInput() {
    return cy.get("textarea[name='item_name']");
  },
  get saveTaskButton() {
    return cy.get("button[name='new_item_save']");
  },
  get cancelTaskButton() {
    return cy.get("button[name='new_item_cancel']");
  },
  get taskTitle() {
    return cy.get("p[class='vs-c-task-card__title']");
  },
  get editDescriptionIcon() {
    return cy.get("button[name='item_description_edit']");
  },
  get descriptionTextarea() {
    return cy.get("textarea[name='description']");
  },
  get saveDescriptionButton() {
    return cy.get("button[name='item_description_save']");
  },
  get addChecklistButton() {
    return cy.get("button[name='add-checklist-button']");
  },
  get newChecklistItemTitle() {
    return cy.get("textarea[name='new_checklist_item_title']");
  },
  get checklistTab() {
    return cy.get("span[name='tabs-title']");
  },
  get deleteChecklistButton() {
    return cy.get("button[title='Delete Checklist']");
  },
  get checklistRadioButton() {
    return cy.get("label[class='el-radio']");
  },
  get uploadFile() {
    return cy.get("div[class='el-upload-dragger']");
  },
  get taskComment() {
    return cy.get("textarea[name='new_comment']");
  },
  get saveCommentButton() {
    return cy.get("button[name='comment_save']");
  },

  createTask({
    taskName = data.task.taskName,
    taskDescription = data.task.taskDescription,
    checklistName = data.task.checklistName,
  }) {
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/tasks"
    ).as("createTask");
    this.taskFooter.trigger("mouseover");
    this.newTaskButton.invoke("show").click();
    this.taskNameInput.type(taskName);
    this.saveTaskButton.click();
    this.taskTitle.contains(data.task.taskName).click();
    this.editDescriptionIcon.click({ force: true });
    this.descriptionTextarea.type(taskDescription);
    this.saveDescriptionButton.click();
    this.addChecklistButton.click();
    this.newChecklistItemTitle.type("to do{enter}");
    cy.wait("@createTask").then((intercept) => {
      console.log(intercept.response);
      expect(intercept.response.statusCode).to.eql(201);
      expect(intercept.response.body.name).to.eql(data.task.taskName);
      taskId = intercept.response.id;
    });
  },
};
