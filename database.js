const mysql = require('mysql');
const db = mysql.createConnection({
    host: '85.10.205.173',
    user: 'wellnesstracking',
    password: 'welcometosql',
    database: 'wellnesstracking'
});

db.connect(err => {
  if (err) {
    console.log(err);
  }

  console.log('Connected to the database');
});

module.exports = {
  db
}