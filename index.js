var config = require('./config.json'),
	db = require('./db'),
	fs = require('fs'),
	router = require('./router'),
	server = require('./server'),
	superagent = require('superagent');

db.setUp(config.db_host, config.db_port, config.db_name, startServer);

function startServer(db){
	server.start(config.server_host, config.server_port);
	router.route(server.express_app, db);
};

// Watch for changes on config.json, reload server if file's stats are modified
fs.watchFile("./config.json", function(){
	var config = JSON.parse(fs.readFileSync("./config.json"));
	server.restart(config.server_host, config.server_port)
});