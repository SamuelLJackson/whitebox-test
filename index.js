var mysql = require('mysql');
var chalk = require('chalk');
var figlet = require('figlet');
var { convert } = require('./convert');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  port: '3306',
  user     : 'root',
  password : 'whitebox',
  database : 'whitebox',
});

console.log(
    chalk.green(
      figlet.textSync('Whitebox Challenge', { horizontalLayout: 'full' })
    )
  );

connection.connect();
const filename = 'result.xlsx';

connection.query("select start_weight as 'Start Weight', end_weight as 'End Weight', zone as Zone from rates where client_id=1240", function (error, results, fields) {
  if (error) throw error;
  convert(results, filename);
});

connection.end();
