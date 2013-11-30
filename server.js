var express = require("express"),
	fs = require("fs"),
	http = require("http");

// Framework built over connect and http module
var express_app = express();
express_app.use(express.bodyParser());
express_app.use(express.cookieParser());
express_app.use(express.session({secret: '1234567890QWERTY'}));

function start_server(server_host, server_port){
	server = express_app.listen(server_port, server_host, function(){
		console.log("Listening on " + server_host + ":" + server_port);
	});
}

function restart_server(server_host, server_port){
	server.close()
	start_server(server_host, server_port);
}

exports.start = start_server;
exports.restart = restart_server;
exports.express_app = express_app;