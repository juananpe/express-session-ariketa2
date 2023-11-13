var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// load database.json
const datubase = require('./datubase.json');

router.post('/',(req,res) => {

  datubase.forEach(function(user){
    if(req.body.username == user.username && req.body.password == user.password){
      req.session.userid=req.body.username;
      console.log(req.session)
    }
  })

  if (req.session.userid) {
    res.redirect('/protected');
  } else {
    res.send('Invalid username or password');
  }

})


module.exports = router;
