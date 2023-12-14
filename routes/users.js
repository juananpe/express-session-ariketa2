var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// load database.json
const datubase = require('./datubase.json');


router.post('/json',(req,res) => {

  datubase.forEach(function(user){
    if(req.body.username == user.username && req.body.password == user.password){
      req.session.userid=req.body.username;
      console.log(req.session)
    }
  })

  if (req.session.userid) {
    res.json({status: 'success', message: 'Logged in'})
  } else {
    res.json({status: 'error', message: 'Invalid username or password'})
  }

})


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

/*
const saltRounds = 10;
const hashedPassword = await bcrypt.hash('plainTextPassword', saltRounds);
// Now store 'hashedPassword' in your database instead of the plain text password
*/

router.post('/fixed', async (req, res) => {
  let authenticatedUser = null;

  for (const user of datubase) {
    if (req.body.username == user.username) {
      // Use bcrypt to compare the provided password with the stored hashed password
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        authenticatedUser = user;
        break;
      }
    }
  }

  if (authenticatedUser) {
    req.session.userid = authenticatedUser.username;
    console.log(req.session);
    res.redirect('/protected');
  } else {
    res.send('Invalid username or password');
  }
});



router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;
