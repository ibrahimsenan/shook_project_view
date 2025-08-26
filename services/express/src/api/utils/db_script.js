const { dump1, userLogin, userType } = require("../utils/db");
const axios = require("axios");
const lodash = require("lodash");
const baseUrl = "http://localhost:5000/api/v1/";

let userToken = "";
function runDBScript(users) {
  if (dump1.length > 0) {
    for (let user of dump1) {
      return axios.default
        .post(baseUrl + "/user/", {
          ...user,
        })
        .then((response) => console.log("jsonResponse", response))
        .catch((error) => console.log("ERROR", error));
    }
  }
}

function runLoginUser(users) {
  return axios.default
    .post(baseUrl + "/user-login", {
      ...userLogin,
    })
    .then((response) => {
      userToken = response.data.data.token;

      if (userToken) {
        postUserType();
      }
    })
    .catch((error) => console.log("ERROR", error));
}

function postUserType(type) {
  userType.map((type) => {
    axios.default
      .post(baseUrl + "/user/user-type", {
        data: type,
        token: userToken,
      })
      .then((response) => console.log("jsonResponse"))
      .catch((error) => console.log("ERROR", error));
  });
  for (let type of userType) {
  }
}

module.exports = { runDBScript, runLoginUser };
