var mysql      = require('mysql');
var { convert } = require('./convert');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  port: '3306',
  user     : 'root',
  password : 'whitebox',
  database : 'whitebox',
});

connection.connect();
const filename = 'test1.xlsx';
const allUsers = require('./sample.json');

connection.query('select * from rates where client_id=1240', function (error, results, fields) {
  if (error) throw error;
  console.log(results[0]);

  convert(results, filename);
});

connection.end();
