var express = require('express');
var studentsController = require('../controllers/studentscontroller.js');
var router = express.Router();

/* GET students listing. */
router.get('/get', function(req, res, next) {
  var studentsData = studentsController.getStudents((err, response) =>{
    if (err) res.send(err);
    res.send(JSON.parse(response));
  });
});

/* add new student */
router.post('/add', function(req, res, next) {
  var studentsData = studentsController.addStudent(req.body.name,
                              req.body.branch, req.body.rollno,
                              (err, response) =>{
    if (err) throw err;
    console.log(response);
    res.send(JSON.parse(response));
  });
});

/* updaet student */
router.post('/update', function(req, res, next) {
  var studentsData = studentsController.updateStudent(req.body.name,
                              req.body.branch, req.body.rollno, req.body.id,
                              (err, response) =>{
    if (err) throw err;
    console.log(response);
  });
  res.send('respond with a resource');
});

/* remove student */
router.post('/remove', function(req, res, next) {
  var studentsData = studentsController.removeStudent(req.body.id,
                              (err, response) =>{
    if (err) throw err;
    console.log(response);
  });
  res.send('respond with a resource');
});

module.exports = router;
