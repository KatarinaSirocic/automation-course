import color from "../support/consoleColor";

module.exports = {
  login({
    email = "ajderadi1@gmail.com",
    password = "1234567",
    statusCode = 200,
    testMessage = "",
  }) {
    return cy
      .request({
        failOnStatusCode: false, //ako api pukne da ne pukne test
        method: "POST",
        url: "https://cypress-api.vivifyscrum-stage.com/api/v2/login",
        body: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        typeof response.status !== "undefined" && response.status === statusCode
          ? color.log(`${testMessage} - Pass, "success"`)
          : color.log(
              `${testMessage} - Fail - ${JSON.stringify(response)}, "error"`
            );
        expect(response.status).to.eql(statusCode);
        return response.body.token;
      });
  },
};
