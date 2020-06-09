const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "andrew",
  password: "password",
  database: "MrCoffeedb_p4",
});

db.connect(function(err) {
    if (err) throw err;
    console.log("MYSQL Database Connected!");
    });

  module.exports = db;