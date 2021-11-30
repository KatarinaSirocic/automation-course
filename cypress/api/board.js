import faker from "faker";
import color from "../support/consoleColor";

module.exports = {
  post({
    token = "",
    boardName = faker.lorem.word(),
    statusCode = 201,
    testMessage = "",
    type = "",
    organizationId = "",
  }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "POST",
        url: "https://cypress-api.vivifyscrum-stage.com/api/v2/boards",
        statusCode: 201,
        body: {
          configuration_board_id: null,
          name: boardName,
          organization_id: organizationId,
          team_members_board_id: null,
          type: "scrum_board",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        typeof response.status !== "undefined" && response.status === statusCode
          ? color.log(`${testMessage} - Organization created, "success"`)
          : color.log(
              `${testMessage} - Fail - ${JSON.stringify(response)}, "error"`
            );
        expect(response.status).to.eql(statusCode);
        return response.body;
      });
  },
  put({
    token = "",
    boardName = "",
    boardCode = "",
    boardId = "",
    description = "",
    statusCode = 200,
    testMessage = "",
  }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "PUT",
        url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
        statusCode: 200,
        body: {
          code: boardCode,
          name: boardName,
          description: "",
          task_unit: "points",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        typeof response.status !== "undefined" && response.status === statusCode
          ? color.log(`${testMessage} - Organization created, "success"`)
          : color.log(
              `${testMessage} - Fail - ${JSON.stringify(response)}, "error"`
            );
        expect(response.status).to.eql(statusCode);
        return response.body;
      });
  },

  get({ token = "", boardId = "", statusCode = 200, testMessage = "" }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "GET",
        url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
        statusCode: 200,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        typeof response.status !== "undefined" && response.status === statusCode
          ? color.log(`${testMessage} - Organization created, "success"`)
          : color.log(
              `${testMessage} - Fail - ${JSON.stringify(response)}, "error"`
            );
        expect(response.status).to.eql(statusCode);
        return response.body;
      });
  },
  getAllBoards({
    token = "",
    boardId = "",
    statusCode = 200,
    testMessage = "",
    organizationid = "",
  }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "GET",
        url: `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${organizationId}/boards-data`,
        statusCode: 200,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        typeof response.status !== "undefined" && response.status === statusCode
          ? color.log(`${testMessage} - Organization created, "success"`)
          : color.log(
              `${testMessage} - Fail - ${JSON.stringify(response)}, "error"`
            );
        expect(response.status).to.eql(statusCode);
        return response.body;
      });
  },
  delete({ token = "", boardId = "", statusCode = 200, testMessage = "" }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "DELETE",
        url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
        statusCode: 200,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        typeof response.status !== "undefined" && response.status === statusCode
          ? color.log(`${testMessage} - Organization created, "success"`)
          : color.log(
              `${testMessage} - Fail - ${JSON.stringify(response)}, "error"`
            );
        expect(response.status).to.eql(statusCode);
      });
  },
};
