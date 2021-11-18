/*
 * Title: Not Found Handler
 * Description: 404 not found handler
 * Author: Md. Faysal Islam Shuvo
 * Date:
 */

// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  console.log(requestProperties);

  callback(404, {
    message: "req was not found",
  });
};

module.exports = handler;
