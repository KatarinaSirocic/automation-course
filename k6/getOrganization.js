import http from "k6/http";
import { check } from "k6";
const tokens = open("token.json");

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 10,
  duration: "10s",
  tresholds: {
    http_req_duration: ["p(90) < 400", "p(95) < 600", "p(99.9) < 800"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  let token = JSON.parse(tokens);
  let res = http.get(
    "https://cypress-api.vivifyscrum-stage.com/api/v2/my-organizations",
    {
      headers: {
        Authorization: `${token.admin}`,
      },
    }
  );
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}
