var mongo = require('mongodb');
var ObjectId = mongo.ObjectID
var mongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/student_database";


/**
  Insert new student record into students table
**/
var addStudent = function (studentName, studentBranch, rollNo, callBack) {
  var dataObject = {name : studentName,
                    branch : studentBranch,
                    rollno : rollNo};
  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("students").insertOne(dataObject, function(err, res) {
      if (err) return callBack(err);
      db.close();
      getStudents((err, response) =>{
        if (err) return callBack(err);
        return callBack(null, JSON.stringify(response));
      });
    });
  });
}

/**
  Get the list of all students from the db
**/
var getStudents = function (callBack) {
  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("students").find({}).toArray(function(err, result) {
      if (err) return callBack(err);
      console.log(result);
      db.close();
      return callBack(null, JSON.stringify(result));
    });
  });
}

/**
  Update given student information based on id
**/
var updateStudent = function (name, branch, roll, rowId, callBack) {
  var dataObject = {'name' : name,
                    'branch' : branch,
                    'rollno' : roll};
  mongoClient.connect(url, function(err, db) {
    if (err) callBack(err);
    var query = { _id: ObjectId(rowId) };
    db.collection("students").updateOne(query, dataObject, function(err, res) {
      if (err) callBack(err);
      console.log("1 record updated");
      db.close();
      getStudents((err, response) =>{
        if (err) return callBack(err);
        return callBack(null, JSON.stringify(response));
      });
    });
  });
}

/**
  Remove student from students table
**/
var removeStudent = function (rowId, callBack) {
  mongoClient.connect(url, function(err, db) {
    if (err) callBack(err);
    var query = { _id: ObjectId(rowId) };
    console.log(rowId);
    db.collection("students").deleteOne(query, function(err, obj) {
      if (err) callBack(err);
      console.log("1 record deleted");
      db.close();
      getStudents((err, response) =>{
        if (err) return callBack(err);
        return callBack(null, JSON.stringify(response));
      });
    });
  });
}

module.exports = {addStudent, updateStudent, removeStudent, getStudents};
