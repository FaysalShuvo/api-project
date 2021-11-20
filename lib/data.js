/*
 * Title: Data
 * Description:
 * Author: Md. Faysal Islam Shuvo
 * Date:
 */

// dependencies
const fs = require("fs");
const path = require("path");

const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, "/../.data/");

// write data to file
lib.create = function (dir, file, data, callback) {
  // open file for writing
  fs.open(
    lib.basedir + dir + "/" + file + ".json",
    "wx",
    function (err, fileDescriptor) {
      if (!err && fileDescriptor) {
        //   convert data to string
        const stringData = JSON.stringify(data);

        // write data to file and close it
        fs.writeFile(fileDescriptor, stringData, function (err) {
          if (!err) {
            fs.close(fileDescriptor, function (err) {
              if (!err) {
                callback(false);
              } else {
                callback("Error Closing the new file");
              }
            });
          } else {
            callback("Error writing to new File");
          }
        });
      } else {
        callback(err);
      }
    }
  );
};

module.exports = lib;
