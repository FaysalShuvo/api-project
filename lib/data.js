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
    `${lib.basedir + dir}/ ${file}.json`,
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

// read data from file
lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.basedir + dir}/ ${file}.json`, "utf8", (err, data) => {
    callback(err, data);
  });
};

// update existing file
lib.update = (dir, file, data, callback) => {
  // file open for updating
  fs.open(`${lib.basedir + dir}/ ${file}.json`, "r+", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // convert the data to string
      const stringData = JSON.stringify(data);

      //   truncate the file
      fs.ftruncate(fileDescriptor, (err) => {
        if (!err) {
          // write to the file and close
          fs.writeFile(fileDescriptor, stringData, (err) => {
            if (!err) {
              fs.close(fileDescriptor, (err) => {
                if (!err) {
                  callback(false);
                } else {
                  callback("error ");
                }
              });
            } else {
              callback("error writing to file");
            }
          });
        } else {
          callback(`Error Truncating file`);
        }
      });
    } else {
      console.log("Err updating");
    }
  });
};

module.exports = lib;
