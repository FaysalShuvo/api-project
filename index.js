/*
 * Title: Uptime monitoring app
 * Description:A restful api
 * Author: Md. Faysal Islam Shuvo
 * Date:
 */

// dependencies
const http = require("http");
const url = require("url");
const { StringDecoder } = require("string_decoder");

// app object - module scaffolding
const app = {};

// configuration
app.config = {
  port: 6000,
};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log("Server RUnning......");
  });
};

// handle req res
app.handleReqRes = (req, res) => {
  // get the url and parse it
  const parseUrl = url.parse(req.url, true);

  const path = parseUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObj = parseUrl.query;
  const headersObj = req.headers;

  const decoder = new StringDecoder("utf-8");
  let realData = "";

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });
  req.on("end", () => {
    realData += decoder.end();
    console.log(realData);
    // response handle
    res.end("Hello");
  });
};

// start the server
app.createServer();
