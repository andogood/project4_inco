var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const crypto = require('crypto');

const db = require('../util/database.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('Registration page')
  res.render('register.hbs');
});


    const getHashedPassword = (password) => {
      const sha256 = crypto.createHash('sha256');
      const hash = sha256.update(password).digest('base64');
      return hash;
      console.log(hash);
  }

router.post('/', (req, res) => {
    const { email, first_name, surname, password, confirmPassword } = req.body;
    const hashedPassword = getHashedPassword(password);
    var checkEmail = req.body.email
    if (password === confirmPassword) {
        db.query("SELECT COUNT(*) AS cnt FROM users WHERE email = ? " , checkEmail , function(err , data){
            console.log('email checked')
            if(data[0].cnt > 0){  
                // Already exist 
            res.render('register.hbs', {
            message: 'User already registered.',
            messageClass: 'alert-danger'
            }) 
            } else {
                var sql = 'INSERT INTO users SET ?';
                db.query(sql, { first_name, surname, email, password : hashedPassword}, function (err, data) { 
                if (err) throw err;
                console.log("form data is inserted successfully "); 
                });            
                console.log('entered new user')
                res.render('login.hbs', {
                    message: 'Registration Complete. Please login to continue.',
                    messageClass: 'alert-success'
                    })
            }
        });
    } else {
        res.render('register.hbs', {
            message: 'Password does not match.',
            messageClass: 'alert-danger'
        });
    }
});

module.exports = router;
