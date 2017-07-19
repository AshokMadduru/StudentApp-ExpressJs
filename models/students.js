var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ash@k001",
  database: "student_app"
});

var createTable = con.connect(function(err) {
  if (err) throw err;
  var sql = "CREATE TABLE students (id INT NOT NULL AUTO_INCREMENT, "
    + "name VARCHAR(255), branch VARCHAR(255), rollno VARCHAR(255), PRIMARY KEY (ID))";
  //var sql = "DROP TABLE students";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
});

module.exports = createTable;
