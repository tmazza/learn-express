var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login',{
    title: 'Login',    
  });
});

/* POST login page. */
router.post('/login', function(req, res, next) {
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = router;
