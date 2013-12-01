var mongo = require('mongodb');

function setUp(host, port, db_name, callback){
	db = new mongo.Db(db_name, new mongo.Server(host, port), {native_parser: true, safe: true});
	db.open(function(error){
		if (error)
			throw error;

		console.log('Connected to mongodb://' + host + ':' + port);

		db.createCollection('users', {w: 1}, function(err, collection) {
			insertDummyUsers(collection);
		});

		db.createCollection('tweets', function(err, collection) {
			if (err)
				throw err;
		});

		db.getObj = getObj;
		db.insertObj = insertObj;

		callback(db);
	});
};

function insertDummyUsers(collection){
	collection.remove(function(){
		collection.insert({
			"user": "admin",
			"password": "admin",
			"group": "admin"}, function(){}
		);

		collection.insert({
			"user": "user_3",
			"password": "somepassword",
			"group": "admin"
		}, function(){});
	});
}

function insertObject(obj){
	this.insert(obj, function(){});
}

function getObj(collection_name, cb){
	db.collection(collection_name).find({}, function(err, cursor){
		if (err)
			throw err;

		cursor.toArray(function(error, objArray){
			cb(objArray);
		});
	});
};

function insertObj(collection_name, obj){
	db.collection(collection_name).insert(obj, function(){});
}

exports.setUp = setUp;