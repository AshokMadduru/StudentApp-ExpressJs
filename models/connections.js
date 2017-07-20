var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/student_database";

var createDb = mongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
});

module.exports = {mongoClient, url};
