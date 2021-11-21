/*
 * Title: Routes
 * Description: application route
 * Author: Md. Faysal Islam Shuvo
 * Date:
 */

// dependencies
const { sampleHandler } = require("./handlers/routHandlers/sampleHandler");
const { userHandler } = require("./handlers/routHandlers/userHandler");
const { tokenHandler } = require("./handlers/routHandlers/tokenHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
};

module.exports = routes;
