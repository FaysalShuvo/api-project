/*
 * Title: Utilities
 * Description:
 * Author: Md. Faysal Islam Shuvo
 * Date:
 */

// dependencies

const crypto = require("crypto");
const environments = require("./environment");

// module scaffolding
const utilities = {};

// parse JSON string to Object
utilities.parseJSON = (jsonString) => {
  let output;

  try {
    output = JSON.parse(jsonString);
  } catch (err) {
    console.log(err);
    output = {};
  }

  return output;
};

// hash string
utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    // console.log(environments, process.env.NODE_ENV);
    const hash = crypto
      .createHmac("sha256", environments.secretKey)
      .update(str)
      .digest("hex");
    return hash;
  }
  return false;
};

// create random string
utilities.createRandomString = (strLength) => {
  let length = strLength;
  length = typeof strLength === "number" && strLength > 0 ? strLength : false;

  if (length) {
    let possibleCharacter = "abcdefghijklmnopqrstuvwxyz1234567890";
    let output = "";

    for (let i = 0; i <= length; i++) {
      let randomCharacter = possibleCharacter.charAt(
        Math.floor(Math.random() * possibleCharacter.length)
      );
      output += randomCharacter;
    }
    return output;
  } else {
    return false;
  }
};

// export module
module.exports = utilities;
