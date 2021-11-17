/*
 * Title: Uptime monitoring app
 * Description:A restful api
 * Author: Md. Faysal Islam Shuvo
 * Date:
 */

// dependencies
const http = require("http");

// app object - module scaffolding
const app = {};

// configuration
app.config = {
  port: 8000,
};

// create server
app.createServer = () => {
  const server = http.createServer();
  server.listen(app.config.port);
};

// handle req res
app.handleReqRes = (req, res) => {
  // response handle
  res.end("Hello");
};
