var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/protected',(req,res) => {

  if(req.session.userid){
    res.render('protected')
  }else
    res.redirect('form.html')
});


router.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;
