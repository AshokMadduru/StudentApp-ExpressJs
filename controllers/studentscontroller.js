var mysql = require('mysql');
//var students = require('../models/students.js');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ash@k001",
  database: "student_app"
});

/**
  Insert new student record into students table
**/
var addStudent = function (name, branch, roll, callBack) {
    var sql = "INSERT INTO students (name, branch, rollno) VALUES ('";
    var valuesString = name + "' , '" + branch + "' , '" + roll + "')";
    sql += valuesString;
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) {
        return callBack(err);
      } else {
        getStudents((err, response) =>{
          if (err) return callBack(err);
          return callBack(null, JSON.stringify(response));
        });
      }
    });
}

/**
  Get the list of all students from the db
**/
var getStudents = function (callBack) {
    var sql = "select * from students";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) {
        return callBack(err);
      } else {
      return callBack(null, JSON.stringify(result));
      }
    });
}

/**
  Update given student information based on id
**/
var updateStudent = function (name, branch, roll, id, callBack) {
    var sql = "update students set name = '" + name +"' , branch = '"
                + branch + "' , rollno ='" +roll+"' where id = '" + id + "'";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) {
        return callBack(err);
      } else {
        getStudents((err, response) =>{
          if (err) return callBack(err);
          return callBack(null, JSON.stringify(response));
        });
      }
    });
}

/**
  Remove student from students table
**/
var removeStudent = function (id, callBack) {
    var sql = "delete from students where id = '" + id + "'";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) {
        return callBack(err);
      } else {
        getStudents((err, response) =>{
          if (err) return callBack(err);
          return callBack(null, JSON.stringify(response));
        });
      }
    });
}

module.exports = {addStudent, updateStudent, removeStudent, getStudents};
