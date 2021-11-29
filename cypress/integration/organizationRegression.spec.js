import organizationApi from "../api/organization";
import userApi from "../api/user";
import data from "../fixtures/data.json";

describe("Api testing", () => {
  let userToken;
  before(() => {
    userApi.login({ testMessage: "Login before other tests" }).then((token) => {
      userToken = token;
    });
  });

  it("Create organization with Empty name", () => {
    console.log(userToken);
    organizationApi.post({
      token: userToken,
      orgName: " ",
      testMessage: "Cannot create org without a name",
      statusCode: 401,
    });
  });

  it("Create organization with name more then 255 char", () => {
    organizationApi.post({
      token: userToken,
      orgName: data.organization.nameMoreThen255char,
      testMessage: "Cannot create org with a name > 255 characters",
      statusCode: 401,
    });
  });

  it("Create organization", () => {
    organizationApi.post({
      token: userToken,
      testMessage: "Successfully created organization",
    });
  });
});
