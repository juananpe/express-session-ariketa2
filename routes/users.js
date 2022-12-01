var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

router.post('/',(req,res) => {
  if(req.body.username == myusername && req.body.password == mypassword){

    req.session.userid=req.body.username;
    console.log(req.session)
    res.redirect('/protected');
  }
  else{
    res.send('Invalid username or password');
  }
})


module.exports = router;
