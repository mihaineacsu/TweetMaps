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

exports.setUp = setUp;