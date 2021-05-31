var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');
var Trainer = require('../models/trainer');
var Student = require('../models/student');

/* GET home page. */
// URL: http://localhost:3000/home/
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Private School' });
});

// GET Trainers page
// URL: http://localhost:3000/home/trainers
router.get('/trainers', function(req, res, next) {
  const query = "SELECT * FROM trainer";
  dbconnection.query(query, function(err, rows) {
    if(err) {
      res.render('trainers', { title: 'Trainers - ERROR', trainer: ''});
    } else {
      res.render('trainers', { title: 'Trainers', trainer:rows});
    }
  });
  
});

// URL:http://localhost:3000/home/trainers/add
router.get('/trainers/add/', function(req, res, next) {
  res.render('trainers_new', { title: 'Trainer - Add new', message: ''});
});

// POST for Trainers
router.post('/trainers/add', function(req, res, next) {
  var trainer = new Trainer(undefined, req.body.firstName, req.body.lastName, req.body.subject);
  const query = "INSERT INTO `trainer`(firstName, lastName, subject) VALUES( ? , ? , ?);";
  dbconnection.execute(query, [trainer.firstName, trainer.lastName, trainer.subject], function (err, result, fields) {
      if (err) {
          res.render("trainers_new", { title: 'Trainer - Add new', message: "Error adding new trainer" });
      } else {
          res.redirect('/home/trainers/');
      }
  });

});


// GET Students page
// URL: http://localhost:3000/home/students
router.get('/students', function(req, res, next) {
  const query = "SELECT * FROM student";
  dbconnection.query(query, function(err, rows) {
    if(err) {
      res.render('students', { title: 'Students - ERROR', student: ''});
    } else {
      res.render('students', { title: 'Students', student:rows});
    }
  });
  
});

// URL:http://localhost:3000/home/students/add
router.get('/students/add/', function(req, res, next) {
  res.render('students_new', { title: 'Student - Add new', message: ''});
});

// POST for Students
router.post('/students/add', function(req, res, next) {
  var student = new Student(undefined, req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.tuitionFees);
  const query = "INSERT INTO `student`(firstName, lastName, dateOfBirth, tuitionFees) VALUES( ? , ? , ?, ?);";
  dbconnection.execute(query, [student.firstName, student.lastName, student.dateOfBirth, student.tuitionFees], function (err, result, fields) {
      if (err) {
          res.render("students_new", { title: 'Student - Add new', message: "Error adding new trainer" });
      } else {
          res.redirect('/home/students/');
      }
  });

});

// GET Courses page
// URL: http://localhost:3000/home/courses
router.get('/courses', function(req, res, next) {
  const query = "SELECT * FROM course";
  dbconnection.query(query, function(err, rows) {
    if(err) {
      res.render('courses', { title: 'Courses - ERROR', course: ''});
    } else {
      res.render('courses', { title: 'Courses', course:rows});
    }
  });
  
});

// GET Assignments page
// URL: http://localhost:3000/home/assignments
router.get('/assignments', function(req, res, next) {
  const query = "SELECT * FROM assignment";
  dbconnection.query(query, function(err, rows) {
    if(err) {
      res.render('assignments', { title: 'Assignments - ERROR', assignment: ''});
    } else {
      res.render('assignments', { title: 'Assignments', assignment:rows});
    }
  });
  
});

module.exports = router;