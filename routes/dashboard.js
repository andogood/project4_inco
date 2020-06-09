var express = require('express');
var mysql = require('mysql');
var router = express.Router();
const crypto = require('crypto');
const db = require('../util/database.js');

const routeProtector = (req, res, next) => {

  if (req.session && req.session.ID_user) return next()
  return res.redirect('login');
};


//gets schedules for user
router.get('/', routeProtector,function (req, res, next) {
  db.query("Select * from schedules Where ID_user = ?", [req.session.userId] , function (err, result) {
    if (err) throw Error;
console.log(result)
    res.render('dashboard', { result });
  });
});

//this requests renders the body (inputs into the console)
router.post('/', function(req, res, next) {
  // store all the user input data

  const {  day_of_the_week, start_time, end_time} = req.body;
  // insert user data into users table
const ID_user = req.session.userId
console.log(ID_user)
  var sql = 'INSERT INTO schedules SET ?';
  db.query(sql, {ID_user , day_of_the_week, start_time, end_time} , function (err, data) {

      if (err) throw err;
         console.log("form data is inserted successfully "); 
  });
 res.redirect('dashboard');  // redirect to user form page after inserting the data
});

// router.get('/', function(req, res) {
//   console.log('dashboard')
//   res.render('dashboard', { title: 'User Shifts' });
// });

module.exports = router;
