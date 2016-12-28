var db = require('../components/db');

var data = false;

exports.findAll = function(fn) {
  var collection = db.get().collection('sensor');

  collection.find().toArray(function(err, sensors) {
    if(err) return fn(err);
    fn(null, sensors);
  });

}

exports.insert = function(sensor) {
  var collection = db.get().collection('sensor');
  collection.insert(sensor);
}
