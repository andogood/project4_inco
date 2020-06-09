var express = require('express');
var mysql = require('mysql');
var router = express.Router();
const crypto = require('crypto');
const db = require('../util/database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('index')

  db.query("SELECT * FROM schedules", function (err, result, fields) {
    if (err) throw err;
    console.log(result)
    console.log(fields)

    res.render('index', { title: 'Mr Coffee DB' })
  });  

});

// GET /logout
router.get('/logout', function(req, res, next) {
  console.log('logged out index')
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        console.log("The session is now " + req.session);
        res.redirect('/login');
      }
    });
  }
});

// Code to show All schedules

//gets schedules for user
// db.connect(function (err) {

 
// });

module.exports = router;
