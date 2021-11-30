import userApi from "../api/user";
import organizationApi from "../api/organization";
import consoleColor from "../support/consoleColor";

describe("Api Organization testing", () => {
  let userToken;
  let allOrganizations;
  before("Login beofre all tests", () => {
    userApi.login({ testMessage: "Login before other tests" }).then((token) => {
      userToken = token;
    });
  });

  after("Delete all organizations", () => {
    allOrganizations.forEach((el) =>
      organizationApi.delete({ token: userToken, organizationId: el.id })
    );
  });

  let organizationId;
  it("Create organization", () => {
    organizationApi
      .post({ token: userToken, testMessage: "Created successfully" })
      .then((organizationObject) => {
        console.log(organizationObject);
        organizationId = organizationObject.id;
      });
  });
  it("Edit organization", () => {
    organizationApi.put({
      token: userToken,
      organizationId: organizationId,
      testMessage: "Successfully deleted",
    });
  });
  it("Get all organizations", () => {
    organizationApi.get({ token: userToken }).then((allOrgs) => {
      console.log(allOrgs);
      allOrganizations = allOrgs;
    });
  });
  // it("Delete organization", () => {
  //   organizationApi.delete({
  //     token: userToken,
  //     organizationId: organizationId,
  //     testMessage: "Successfully deleted",
  //   });
  // });
});
