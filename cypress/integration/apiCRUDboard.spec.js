import userApi from "../api/user";
import organizationApi from "../api/organization";
import boardApi from "../api/board";
import faker from "faker";
import data from "../fixtures/data.json";

describe("API Board testing", () => {
  let userToken;
  let orgId;
  let boardId;
  let boardCode;
  let allBoards;

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

  it("Create Board", () => {
    console.log(userToken);
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

  it("Update Board", () => {
    boardApi.put({
      boardId: boardId,
      token: userToken,
      boardName: data.board.changedBoardName,
      boardCode: boardCode,
      testMessage: "Successfully updated board",
      description: "some random description",
    });
  });

  it("Get Board", () => {
    boardApi.get({
      token: userToken,
      boardId: boardId,
      testMessage: "Successfully got the board",
    });
  });

  it("Get All Boards for One organization", () => {
    boardApi
      .get({
        token: userToken,
        organizationId: orgId,
        testMessage: "Successfylly got all boards",
      })
      .then((response) => {
        allBoards = response;
      });
  });

  it("Delete All Boards for One organization", () => {
    allBoards.forEach((el) =>
      boardApi.delete({
        token: userToken,
        boardId: el.id,
        testMessage: "All boards successfully deleted",
      })
    );
  });
});
