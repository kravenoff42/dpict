const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'mydata.cumqlzvaxiop.us-east-1.rds.amazonaws.com',
  user: 'mydatauser',
  password: 'AcCr4D4t4',
  database: 'mydata'
});

let data;

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
connection.query('SELECT * FROM projects', function (error, results, fields) {
  if (error) throw error;
  data = results;
  console.log('current rows: ', results.length);
});
connection.end();

