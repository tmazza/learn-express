var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var ObjectId = mongo.ObjectId;

var _db = null;

exports.connect = function(url, done) {
    if(_db) return done();
    MongoClient.connect(url, function(err, db) {
        if(err) return done(err);
        _db = db;
        done();
    });    
}

exports.get = function() {
    return _db;
}

exports.objId = function(id) {
    return ObjectId(id);
}

exports.close = function() {
    if(_db) {
        _db.close(function(err, result) {
            _db = null;
            done(err);
        });
    }
}