var express = require('express');
var router = express.Router();

var db = require('../db.js');
var hash = require('../auth').hash;

/* GET home page. */
router.get('/', function(req, res, next) {
  var collection = db.get().collection('users');
  collection.find().toArray(function(err, result) {
    if(err) console.log(err);
    else console.log(result);
  });
  res.render('index', { 
    title: 'Express',
    user: req.session.user,
  });
});

/* GET. */
router.get('/login', function(req, res, next) {
  res.render('login', {
    msg: req.session.error,
  });  
});

/* GET. */
router.get('/logout', function(req, res, next) {
  req.session.destroy(function() {
    res.redirect('/');
  });
});

router.get('/area-restrita', restrict, function(req, res) {
  res.send('Yes! Good to go.');
});



router.post('/login', function(req, res, next) {

  authenticate(req.body.username, req.body.pwd, function(err, user){
      if (user) {
        req.session.regenerate(function(){
          req.session.user = user;
          res.redirect('/');
        });
      } else {
        req.session.error = 'Usário ou senha incorreta. Use demo/demo';
        res.redirect('/login');
      }
  });

});

var users = {
  tmazza: { nome: 'tmazza'},
  demo: { nome: 'demo' },
};

// Ao incluir usuário gerar salt e hash
hash('345', function(err, salt, hash){
  if (err) throw err;
  users.tmazza.salt = salt;
  users.tmazza.hash = hash;
});

// Ao incluir usuário gerar salt e hash
hash('demo', function(err, salt, hash){
  if (err) throw err;
  users.demo.salt = salt;
  users.demo.hash = hash;
});


function authenticate(name, pass, fn) {
  console.log("-----" + name);
  console.log("-----" + pass);
  if (!module.parent) console.log('authenticating %s:%s', name, pass);

  var user = users[name];
  if (!user) return fn(new Error('Usuário não encontrado'));

  hash(pass, user.salt, function(err, hash){
    if (err) return fn(err);
    if (hash == user.hash) return fn(null, user);
    fn(new Error('Usuário ou senha incorreta.'));
  });
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Identifique-se!';
    res.redirect('/login');
  }
}




module.exports = router;
