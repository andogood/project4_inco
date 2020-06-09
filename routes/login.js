var express = require('express');
var mysql = require('mysql');
var router = express.Router();
const crypto = require('crypto');
const db = require('../util/database.js');

/* GET New Page. */
router.get('/', function(req, res, next) {
  res.render('login.hbs');
});

    const getHashedPassword = (password) => {
      const sha256 = crypto.createHash('sha256');
      const hash = sha256.update(password).digest('base64');
      return hash;
    }

    // login code
router.post('/', (req, res) => {
  const {email, password} = req.body
  const hashedPassword = getHashedPassword(password);
  if(email && password) {
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, hashedPassword], (err, data) => {
          if(err) throw err;
    if (data.length > 0) {

      req.session.ID_user = email;
      req.session.userId = data[0].ID;


      res.redirect('/dashboard');
    } else {
    //res.send('Incorrect Username and/or Password!');
    res.render('login.hbs', {
      message : 'incorrect email or password.',
      messageClass : 'alert-danger',});
    } 
  })
  }
})



module.exports = router;
