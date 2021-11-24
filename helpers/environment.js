/*
 * Title: Environments
 * Description:
 * Author: Md. Faysal Islam Shuvo
 * Date:
 */

// dependencies

// module scaffolding
const environments = {};

environments.staging = {
  port: 3000,
  envName: "staging",
  secretKey: "asdfsdfasdsfasdf",
  maxChecks: 5,
  twilio: {
    fromPhone: "",
    accountSid: "",
    authToken: "",
  },
};

environments.production = {
  port: 5000,
  envName: "production",
  secretKey: "xadasdasdas",
  maxChecks: 5,
  twilio: {
    fromPhone: "",
    accountSid: "",
    authToken: "",
  },
};

// determine which environment was passed

const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

//   export corresponding environment obj
const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.staging;

module.exports = environmentToExport;
