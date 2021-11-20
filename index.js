/*
 * Title: Uptime monitoring app
 * Description:A restful api
 * Author: Md. Faysal Islam Shuvo
 * Date:
 */

// dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environment");

// app object - module scaffolding
const app = {};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`Server at ${environment.port}......`);
  });
};

// handle req res
app.handleReqRes = handleReqRes;

// start the server
app.createServer();
