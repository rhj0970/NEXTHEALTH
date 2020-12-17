const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const { sendEmail } = require('../../utils/nodemailer');
var path = require('path')
//var multer  = require('multer')
//var upload = multer().array('imgCollection')
const jwt = require('jsonwebtoken');
const { db } = require('../../database');

router.get('/:id', (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', req.params.id, (err, rows, fields) => {
    if (err || rows.length <= 0) {
      return res.json({error: err});
    }
    
    return res.json({user: rows[0]});
  });
});



 router.post("/postnew", (req, res) => {
    const flag = req.body.flag;
    const email = req.body.email;
  //console.log("test-update",email)
  const check = "sahibachd@gmail.com"
  console.log("String compare ",email.localeCompare(check));
  if(check === email)
      console.log("There is a match")
  else
    console.log("there is no match")
      //db.query("UPDATE users set flag = 1 where username LIKE '%?%'",[username], (err, result) => {
        db.query("UPDATE users set flag = 1 where email =?",[email], (err, result) => {
       // db.query("Select * from users where email =?",[email.trim()], (err, result) => {
          if (err) {
            return res.json({error: err});
          }
          //console.log(res.json())
          console.log("It was a success");
          return res.json({});
      });

    
  });




 router.post("/posting", (req, res) => {
    const flag = req.body.flag;
    const email = req.body.email;
  //console.log("test-update",email)
  const check = "sahibachd@gmail.com"
  console.log("String compare ",email.localeCompare(check));
  if(check === email)
      console.log("There is a match")
  else
    console.log("there is no match")
      //db.query("UPDATE users set flag = 1 where username LIKE '%?%'",[username], (err, result) => {
        db.query("UPDATE users set flag = -1 where email =?",[email], (err, result) => {
       // db.query("Select * from users where email =?",[email.trim()], (err, result) => {
          if (err) {
            return res.json({error: err});
          }
          //console.log(res.json())
          console.log("It was a success");
          return res.json({});
      });

    
  });

router.post('/professional', (req,res) => {
  db.query('SELECT * FROM users WHERE role = 2 and Flag = 1', (err, rows, fields) => {
    res.send(rows)
  });

});

router.post ('/clients', (req,res) => {
  console.log("it's reaching")
  db.query('SELECT username, email FROM users WHERE role = 1', (err, rows, fields) => {
    console.log(err)
    console.log(rows)
    res.send(rows)
  });

});

router.post('/requests', (req,res) => {
  console.log("it's reaching requests")
  db.query('SELECT username,email,specialty,gender,location FROM users WHERE role = 2 and flag = 0', (err, rows, fields) => {
    console.log(err)
    console.log(rows)
    res.send(rows)
  });

});

router.get("/testing", (req, res) => {

  console.log("testing API")


});



router.post ('/client', (req,res) => {
  
  db.query('SELECT username,email FROM users WHERE role = 1', (err, rows, fields) => {
    console.log(rows)
    res.send(rows)

  });

});



router.post ('/getUsers', (req,res) => {
  db.query('SELECT * FROM users WHERE role = 2', (err, rows, fields) => {
    
    if (err || rows.length <= 0) {
      return res.json({error: err});
    }
  
    return res.json({results: rows});
    
  
  });

});

router.post('/getUsername', (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', req.body.id, (err, rows, fields) => {
    if (err || rows.length <= 0) {
      return res.json({error: err});
    }

    return res.json({username: rows[0].username});
  });
});

router.post ('/getWorkout', (req,res) => {
  db.query('SELECT * FROM workout WHERE filename IS NOT NULL', (err, rows, fields) => {
    
    if (err || rows.length <= 0) {
      return res.json({error: {message: 'Something went wrong while obtaining search data'}});
    }
  
    return res.json({results: rows});
    
  
  });

});

router.post('/userWorkouts', (req, res) => {
  db.query('SELECT * FROM workout WHERE userID = ?', req.body.user, (err, rows, fields) => {
    if (err) {
      return res.json({error: {message: 'Something went wrong while obtaining workouts'}});
    }

    return res.json({workouts: rows});
  });
});


router.post ('/getCalories', (req,res) => {
  console.log("it's reaching to the database")

  db.query('SELECT date, calories FROM calorie ORDER BY date', (err, rows, fields) => {
    
    console.log(rows)
    res.send(rows)
  });

});


router.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.json({error: err});
    }

    db.query("INSERT INTO users (username, password, email, role) VALUES (?,?,?,?);", [name, hash, email, role], (err, result) => {
        if (err) {
          return res.json({error: err});
        }

        db.query('SELECT * FROM users WHERE id = ?', result.insertId, (err, result) => {
          if (err) {
            return res.json({error: err});
          }

          if (result.length <= 0) {
            return res.json({error: {}});
          }
  
          var user = result[0];
          user = JSON.parse(JSON.stringify(user));
  
          jwt.sign(user, process.env.JWT_SECRET, {expiresIn: "1h"}, async (err, token) => {
              if (err) {
                  return res.status(500).json({error: {code: -4, message: 'An unknown problem occurred.'}});
              }
  
              return res.json({token: `Bearer ${token}`});
          });
        });
    });
  });
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE email = ?;",
    email,
    (err, result) => {
      if (err) {
        return res.json({ error: err });
      }

      if (result.length > 0) {
        var user = result[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err || !isMatch) {
            return res.json({ error: {message: "Sorry, your email/password is incorrect, Please try again" }});
          }

          return res.json({});
        });
      } else {
        return res.json({ error: {message: "Invalid Account" }});
      }
    }
  );
});

router.post('/reset', (req, res) => {
  const { email } = req.body;

  db.query('SELECT * FROM users WHERE email = ?;', email, (err, result) => {
    if (err) {
      return res.json({error: err});
    }

    if (result.length <= 0) {
      return res.json({error: {message: 'No account was found with that email address.'}});
    }

    const key = require('crypto').randomBytes(20).toString('hex');

    db.query("UPDATE users SET reset_key = '?' WHERE id = ?;", [key, result[0].id], (err, result) => {
      if (err) {
        return res.json({error: err});
      }

        // Send an email, and let the client know.
      sendEmail(email, 'Reset your Next Health password', 'reset', {key});
      return res.json({});
    });
  });
});

router.post('/reset-key', (req, res) => {
  const { key } = req.body;

  if (!key) {
    return res.json({error: {message: 'That reset key is no longer valid.'}});
  }

  db.query("SELECT * FROM users WHERE reset_key = ?;", key, (err, result) => {
    if (err) {
      return res.json({error: {message: 'Something went wrong while validating your reset key'}});
    }

    if (result.length <= 0) {
      return res.json({error: {message: 'That reset key is no longer valid.'}});
    }

    return res.json({id: result[0].id});
  });
});

router.post('/reset-password', (req, res) => {
  const { id, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.json({error: {message: 'Something went wrong while resetting your password.'}});
    }

    db.query("UPDATE users SET password = ? WHERE id = ?;", [hash, id], (err, result) => {
        if (err) {
          return res.json({error: {message: 'Something went wrong while resetting your password.'}});
        }

        return res.json({});
    });
  });
});



router.post('/createToken', (req, res) => {
  const key = Math.floor(100000 + Math.random() * 900000);
  db.query("UPDATE users SET token = '?' WHERE email = ?;", [key, req.body.email], (err, result) => {
    if (err) {
      return res.json({error: err});
    }
    sendEmail(req.body.email, 'verfication code sent', 'token', {token:key});
    return res.json({});
  });


});



router.post('/submit', (req, res) => {

  db.query("SELECT * FROM users WHERE token = ?;", req.body.token, (err, result) => {
    if (err) {
      return res.json({error: {message: 'Something went wrong while validating your verification'}});
    }

    if (result.length <= 0) {
      return res.json({error: {message: 'Invaid token'}});
    }

    var user = result[0];
    user = JSON.parse(JSON.stringify(user));

    jwt.sign(user, process.env.JWT_SECRET, {expiresIn: req.body.staySignedIn ? '7d' : '1h'}, async (err, token) => {
        if (err) {
            return res.status(500).json({error: {code: -4, message: 'An unknown problem occurred.'}});
        }

        return res.json({token: `Bearer ${token}`});
    });

    //return res.json({id: result[0].id, role: result[0].role, flag: result[0].Flag});
  });
  
  
  
}
  );

///////////////////////////////////////////////////////////////

  router.post("/post", (req, res) => {
    const filename = req.body.filename;
    const plantype = req.body.plantype;
    const speciality = req.body.speciality;
    const gender = req.body.gender;
    const location = req.body.location;
    const duration = req.body.duration;
  console.log("test")
      db.query("INSERT INTO workout (userID, filename, plantype, speciality, gender, location, duration) values(?,?,?,?,?,?,?)", [1, filename, plantype, speciality, gender, location, duration], (err, result) => {
          if (err) {
            return res.json({error: err});
          }
  
          return res.json({});
      });

    
  });

  router.post("/calories", (req, res) => {
    
    const date = req.body.date;
    const calories = req.body.calories;
    console.log("going into router.post calories database")
      db.query("INSERT INTO calorie (userID, date, calories) values(?,?,?)", [1, date, calories], (err, result) => {
          if (err) {
            return res.json({error: err});
          }
  
          return res.json({});
      });

    
  });
  

  router.post('/getUserData', (req, res) => {
    db.query('SELECT * FROM users WHERE id = ?', req.body.user, (err, rows, fields) => {
      if (err || rows.length <= 0) {
        return res.json({error: err});
      }
      
      return res.json({user: rows[0]});
    });
  });

  router.post("/goals", (req, res) => {
    
    const workoutType = req.body.workoutType;
    const duration = req.body.duration;
    console.log("going into router.post goals database")
      db.query("INSERT INTO goal (workoutType, duration) values(?,?)", [workoutType, duration], (err, result) => {
          if (err) {
            return res.json({error: err});
          }
  
          return res.json({});
      });

    
  });

module.exports = router;
