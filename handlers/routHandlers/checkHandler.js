/*
 * Title: check Handler
 * Description: Handler to handle user define
 * Author:
 * Date:
 *
 */
// dependencies
const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");
const { parseJSON, createRandomString } = require("../../helpers/utilities");
const tokenHandler = require("./tokenHandler");
const { maxChecks } = require("../../helpers/environment");

// module scaffolding
const handler = {};

handler.checkHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._check[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._check = {};

handler._check.post = (requestProperties, callback) => {
  // validate inputs
  let protocol =
    typeof requestProperties.body.protocol === "string" &&
    ["http", "https"].indexOf(requestProperties.body.protocol) > -1
      ? requestProperties.body.protocol
      : false;

  let url =
    typeof requestProperties.body.url === "string" &&
    requestProperties.body.url.trim().length > 0
      ? requestProperties.body.url
      : false;

  let method =
    typeof requestProperties.body.method === "string" &&
    ["GET", "POST", "PUT", "DELETE"].indexOf(requestProperties.body.method) > -1
      ? requestProperties.body.method
      : false;

  let successCodes =
    typeof requestProperties.body.successCodes === "object" &&
    requestProperties.body.successCodes instanceof Array
      ? requestProperties.body.successCodes
      : false;

  let timeOutSeconds =
    typeof requestProperties.body.timeOutSeconds === "number" &&
    requestProperties.body.timeOutSeconds % 1 === 0 &&
    requestProperties.body.timeOutSeconds >= 1 &&
    requestProperties.body.timeOutSeconds <= 5
      ? requestProperties.body.timeOutSeconds
      : false;

  console.log(timeOutSeconds);
  if (protocol && url && method && successCodes && timeOutSeconds) {
    let token =
      typeof requestProperties.headersObj.token === "string"
        ? requestProperties.headersObj.token
        : false;

    // look up the user phone by reading token
    data.read("tokens", token, (err1, tokenData) => {
      if (!err1 && tokenData) {
        let userPhone = parseJSON(tokenData).phone;
        // user data
        data.read("users", userPhone, (err2, userData) => {
          if (!err2 && userData) {
            tokenHandler._token.verify(token, userPhone, (tokenIsValid) => {
              if (tokenIsValid) {
                let userObject = parseJSON(userData);
                let userChecks =
                  typeof userObject.checks === "object" &&
                  userObject.checks instanceof Array
                    ? userObject.checks
                    : [];

                if (userChecks.length < maxChecks) {
                  let checkID = createRandomString(20);
                  let checkObject = {
                    id: checkID,
                    userPhone,
                    protocol,
                    url,
                    method,
                    successCodes,
                    timeOutSeconds,
                  };
                  //   save the obj
                  data.create("checks", checkID, checkObject, (err3) => {
                    if (!err3) {
                      // add check id to the user
                      userObject.checks = userChecks;
                      userObject.checks.push(checkID);

                      //   save new user data
                      data.update("users", userPhone, userObject, (err4) => {
                        if (!err4) {
                          callback(200, checkObject);
                        } else {
                          callback(401, {
                            error: " in the server",
                          });
                        }
                      });
                    } else {
                      callback(401, {
                        error: "Problem in the server",
                      });
                    }
                  });
                } else {
                  callback(401, {
                    error: "use has max check limit",
                  });
                }
              } else {
                callback(403, {
                  error: "Auth Failure",
                });
              }
            });
          } else {
            callback(403, {
              error: "User not Found!",
            });
          }
        });
      } else {
        callback(403, {
          error: "Auth Problem",
        });
      }
    });
  } else {
    callback(400, {
      error: "You have a problem in check handler",
    });
  }
};

handler._check.get = (requestProperties, callback) => {};

handler._check.put = (requestProperties, callback) => {};

handler._check.delete = (requestProperties, callback) => {};

module.exports = handler;
