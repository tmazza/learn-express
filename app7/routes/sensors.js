var express = require('express');
var router = express.Router();
var sensorModel = require('../models/sensor');
var filters = require('../components/filters');

/* GET sensor listing. */
router.get('/', function(req, res, next) {
  sensorModel.findAll(function(err, sensors) {
    if(err) console.log('erro!!');
    res.send(sensors);
  });
});

/* GET sensor add page. */
router.get('/add', filters.mustLogin, function(req, res, next) {
  res.render('sensor/form');
});

/* POST sensor add. */
router.post('/add', filters.mustLogin, function(req, res, next) {
  if(sensorModel.insert(req.body) == false)
    console.log('erro');
  res.redirect('/');
});

module.exports = router;
