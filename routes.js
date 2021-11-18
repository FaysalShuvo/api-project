/*
 * Title: Routes
 * Description: application route
 * Author: Md. Faysal Islam Shuvo
 * Date:
 */

// dependencies
const { sampleHandler } = require("./handlers/routHandlers/sampleHandler");

const routes = {
  sample: sampleHandler,
};

module.exports = routes;
