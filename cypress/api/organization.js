import faker from "faker";
import color from "../support/consoleColor";

module.exports = {
  get({ token = "" }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "GET",
        url: "https://cypress-api.vivifyscrum-stage.com/api/v2/my-organizations",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        expect(response.status).to.eql(200);
        return response.body;
      });
  },
  post({
    orgName = faker.animal.crocodilia(),
    token = "",
    statusCode = 200,
    testMessage = "",
  }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "POST",
        url: "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations",
        body: {
          name: orgName,
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
    organizationId = "",
    orgName = "EDIT NAME",
    token = "",
    statusCode = 200,
    testMessage = "",
  }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "PUT",
        url: `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${organizationId}`,
        body: {
          name: orgName,
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

  delete({
    organizationId = "",
    token = "",
    statusCode = 201,
    testMessage = "",
    password = "1234567",
  }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "POST",
        url: `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${organizationId}`,
        body: {
          passwordOrEmail: password,
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
      });
  },
};
