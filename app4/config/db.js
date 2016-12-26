var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectId;

var state = {
    db: null
};

exports.connect = function (url, done) {
    if(state.db) return done();
    
    MongoClient.connect(url, function(err, db) {
        if(err) return done(err);
        state.db = db;
        done();
    });
}

exports.get = function() {
    return state.db;
}

exports.objId = function(id) {
    return ObjectId(id);
}

exports.close = function (done) {
    if(state.db) {
        state.db.close(function(err, result) {
            state.db = null;
            done(err);
        });
    }
} 
