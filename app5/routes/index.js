var express = require('express');
var router = express.Router();

var db = require('../db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  var collection = db.get().collection('users');
  collection.find().toArray(function(err, result) {
    if(err) console.log(err);
    else console.log(result);
  });
  res.render('index', { 
    title: 'Express',
    logado: req.session.user != null,
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
  res.send('ok');
});



router.post('/login', function(req, res, next) {

  authenticate(req.body.username, req.body.pwd, function(err, user){
      if (user) {
        // Regenerate session when signing in
        // to prevent fixation
        req.session.regenerate(function(){
          // Store the user's primary key
          // in the session store to be retrieved,
          // or in this case the entire user object
          req.session.user = user;
          req.session.success = 'Authenticated as ' + user.name
            + ' click to <a href="/logout">logout</a>. '
            + ' You may now access <a href="/restricted">/restricted</a>.';
          res.redirect('/');
        });
      } else {
        req.session.error = 'Authentication failed, please check your '
          + ' username and password.'
          + ' (use "tj" and "foobar")';
        res.redirect('/login');
      }
  });

});


function authenticate(name, pass, fn) {
  console.log("-----" + name);
  console.log("-----" + pass);
  if (!module.parent) console.log('authenticating %s:%s', name, pass);

  // TODO: pegar do db
  // var user = users[name];
  // // query the db for the given username
  // if (!user) return fn(new Error('cannot find user'));
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  // hash(pass, user.salt, function(err, hash){
  //   if (err) return fn(err);
  //   if (hash == user.hash) return fn(null, user);
  //   fn(new Error('invalid password'));
  // });
  return fn(null, {
    id: 'asdasdasdasd',
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
