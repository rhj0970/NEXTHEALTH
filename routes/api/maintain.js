const express = require('express');
const router = express.Router();
   
router.get("/", function(req, res){ 
  req.session.name = 'session'
  return res.send("Session Set") 
}) 
  
router.get("/session", function(req, res){ 
  var name = req.session.name 
  return res.send(name)   
}) 

module.exports = router;