var express = require('express');
var router = express.Router();

var hash = require('../components/auth').hash;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    user: req.session.user, 
  });
});

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login', {
    msg: req.session.error,
  });  
});

/* GET logout */
router.get('/logout', function(req, res, next) {
  req.session.destroy(function() {
    res.redirect('/');
  });
});

router.post('/login', function(req, res, next) {

  authenticate(req.body.username, req.body.pwd, function(err, user){
      if (user) {
        req.session.regenerate(function(){
          req.session.user = user;
          res.redirect('/');
        });
      } else {
        req.session.error = 'Usário ou senha incorreta. Use admin/admin';
        res.redirect('/login');
      }
  });

});

var users = {
  admin: { nome: 'admin' },
};

hash('admin', function(err, salt, hash){
  if (err) throw err;
  users.admin.salt = salt;
  users.admin.hash = hash;
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

module.exports = router;