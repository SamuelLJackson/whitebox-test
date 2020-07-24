var mysql = require('mysql');
var chalk = require('chalk');
var figlet = require('figlet');
var { convert } = require('./convert');
var _ = require('lodash');

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

connection.query("select * from rates where client_id=1240 order by start_weight asc, zone asc", function (error, results ) {
  if (error) throw error;
  var standardDomestic = _.filter(results, function(row) {
    return row.locale =='domestic' && row.shipping_speed === 'standard';
  });
  
  var weights = _.chunk(standardDomestic, 8);
  var standardDomesticRows = produceDomesticRows(weights);

  convert(standardDomesticRows, 'Standard_Domestic.xlsx');
  
  var expeditedDomestic = _.filter(results, function(row) {
    return row.locale =='domestic' && row.shipping_speed === 'expedited';
  });
  
  weights = _.chunk(expeditedDomestic, 8);
  var expeditedDomesticRows = produceDomesticRows(weights);

  convert(expeditedDomesticRows, 'Expedited_Domestic.xlsx');

  var nextDayDomestic = _.filter(results, function(row) {
    return row.locale =='domestic' && row.shipping_speed === 'nextDay';
  });
  
  weights = _.chunk(nextDayDomestic, 8);
  var nextDayDomesticRows = produceDomesticRows(weights);

  console.log(nextDayDomesticRows.length);    

  convert(nextDayDomesticRows, 'Next_Day_Domestic.xlsx');

});

connection.end();

function produceDomesticRows(weights) {
  var newRows = [];
  for (var i=0; i< weights.length; ++i) {
    var tempObj = {};
    var arr = weights[i];
    tempObj['Start Weight'] = arr[0].start_weight;
    tempObj['End Weight'] = arr[0].end_weight;
    tempObj['Zone 1'] = arr[0].rate;
    tempObj['Zone 2'] = arr[1].rate;
    tempObj['Zone 3'] = arr[2].rate;
    tempObj['Zone 4'] = arr[3].rate;
    tempObj['Zone 5'] = arr[4].rate;
    tempObj['Zone 6'] = arr[5].rate;
    tempObj['Zone 7'] = arr[6].rate;
    tempObj['Zone 8'] = arr[7].rate;
    newRows.push(tempObj);
  }
  return newRows;
}
