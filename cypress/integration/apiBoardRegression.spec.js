import userApi from "../api/user";
import organizationApi from "../api/organization";
import boardApi from "../api/board";
import data from "../fixtures/data.json";

describe("API Board testing", () => {
  let userToken;
  let orgId;
  let boardId;
  let boardCode;

  before("Login and create Organization", () => {
    userApi.login({ testMessage: "Login before all tests" }).then((token) => {
      userToken = token;
    });
  });

  it("Create Organization", () => {
    organizationApi
      .post({
        token: userToken,
        testMessage: "Create organization",
      })
      .then((response) => {
        orgId = response.id;
      });
  });

  it("Create Board with a name > 50 characters", () => {
    boardApi.post({
      token: userToken,
      organizationId: orgId,
      boardName: data.organization.nameMoreThen50char,
      statusCode: 401,
      testMessage: "Cannot crate a borad with more then 50 characters",
    });
  });

  it("Create Board with an empty name", () => {
    boardApi.post({
      token: userToken,
      organizationId: orgId,
      boardName: "",
      statusCode: 400,
      testMessage: "Board name is required",
    });
  });

  it("Create Board", () => {
    boardApi
      .post({
        token: userToken,
        organizationId: orgId,
        testMessage: "Successfully created board",
      })
      .then((response) => {
        boardCode = response.code;
        boardId = response.id;
      });
  });

  it("Update Board with a title > 50 characters", () => {
    boardApi.put({
      boardName: data.organization.nameMoreThen50char,
      boardId: boardId,
      token: userToken,
      boardCode: boardCode,
      statusCode: 401,
      testMessage: "Name cannot be > then 50 characters",
    });
  });

  it("Update Board with an empty title", () => {
    boardApi.put({
      boardName: "",
      boardId: boardId,
      token: userToken,
      boardCode: boardCode,
      statusCode: 400,
      testMessage: "Name is required",
    });
  });

  it("Update Board with a Board code > 4 characters", () => {
    boardApi.put({
      boardId: boardId,
      token: userToken,
      boardCode: data.board.invalidBoardCode,
      statusCode: 400,
      testMessage: "Name cannot be > then 4 characters",
    });
  });

  it("Update Board with an empty Board code", () => {
    boardApi.put({
      boardName: data.board.invalidBoardCode,
      boardId: boardId,
      token: userToken,
      boardCode: "",
      statusCode: 401,
      testMessage: "Board code cannot be wmpty",
    });
  });

  it("Valid Board update", () => {
    boardApi.put({
      boardName: data.board.changedBoardName,
      boardId: boardId,
      token: userToken,
      boardCode: boardCode,
      testMessage: "Board Name cannot be > then 50 characters",
    });
  });
});
