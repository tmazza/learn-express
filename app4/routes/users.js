var express = require('express');
var router = express.Router();

var db = require('../config/db.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var collection = db.get().collection('users');
  
  collection.find().toArray(function(err, users) {
    res.render('user/index', { users: users, toJs: JSON.stringify(users) });
  });

});

/* GET add user. */
router.get('/add', function(req, res, next) {
  res.render('user/add');
});

router.post('/add', function(req, res, next) {

  // TODO: usar validadores
  var collection = db.get().collection('users');
  collection.insert(req.body);

  res.redirect('/users');

});

// TODO: usar AJAX e metodo delete
router.get('/delete/id/:id', function(req, res, next) {

  var collection = db.get().collection('users');
  collection.deleteOne({ _id: db.objId(req.params.id) }, function(err) {
    if(err) console.log(err);
  });

  res.redirect('/users')
});

module.exports = router;
