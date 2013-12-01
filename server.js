var express = require("express"),
	fs = require("fs"),
	http = require("http"),
	io = require('socket.io');

// Framework built over connect and http module
var express_app = express();
express_app.use(express.bodyParser());
express_app.use(express.cookieParser());
express_app.use(express.session({secret: '1234567890QWERTY'}));
express_app.use(express.static(__dirname + '/public/'));

function start_server(server_host, server_port){
	server = express_app.listen(server_port, server_host, function(){
		console.log("Listening on " + server_host + ":" + server_port);
	});
	io = io.listen(server);

	io.sockets.on('connection', function (socket) {
  	 socket.on('clientMessage', function(data){
   	 console.log('-----I received a message: ', data)})});
}

function restart_server(server_host, server_port){
	server.close()
	start_server(server_host, server_port);
}

exports.start = start_server;
exports.restart = restart_server;
exports.express_app = express_app;