var mongoClient = require('./connections.js');

mongoClient.mongoClient.connect(mongoClient.url, function(err, db) {
  if (err) throw err;
  db.createCollection("students", function(err, res) {
    if (err) throw err;
    console.log("Table created!");
    db.close();
  });
});
