const fs = require('fs');
var json2xls = require('json2xls');

var convert = function (data, filename) {
  var xls = json2xls(data);
  fs.writeFileSync(filename, xls, 'binary', (err) => {
     if (err) {
           console.log("writeFileSync :", err);
      }
    console.log( filename+" file is saved!");
 });
}

exports.convert = convert;