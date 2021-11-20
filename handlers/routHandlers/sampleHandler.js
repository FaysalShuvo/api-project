/*
 * Title: Sample Handler
 * Description:
 * Author: Md. Faysal Islam Shuvo
 * Date:
 */

// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
  // console.log("request property", requestProperties);

  callback(200, {
    message: "This iS a sample",
  });
};

module.exports = handler;
