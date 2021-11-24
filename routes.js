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
const { checkHandler } = require("./handlers/routHandlers/checkHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
  check: checkHandler,
};

module.exports = routes;
