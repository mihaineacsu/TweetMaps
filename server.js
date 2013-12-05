var express = require("express"),
	fs = require("fs"),
	http = require("http"),
	io = require('socket.io'),
	util = require('util'),
    twitter = require('twitter');

var twit = new twitter({
    consumer_key: 'NO9Z3oBQma8bY7U4A0n8g',
    consumer_secret: '9dHRLfvE7WcXkKsZG0lOwF8TRSNK1sxuUrHMEeEbI',
    access_token_key: '11721852-4H6QD8CpeqsAk90p0CQjEXdK3mA1XEqDR7KUcNf4I',
    access_token_secret: 'Mc6fK4npW0k3Kq9uyGGxqjgkOn2i3517ANr5SaH9qNML2'
});

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
  	 socket.on('searchTweets', function(data){
   	 console.log('-----I received a message: ', data);
   	 var location = data.locations.lng + ',' + data.locations.lat + ',' + (data.locations.lng + 1) + ',' + (data.locations.lat + 1);
   	 twit.stream('statuses/filter', {track:data.q, locations:location}, function(stream) {
    	stream.on('data', function(data) {
        console.log(util.inspect(data));
        setTimeout(undefined ,5000);
        socket.emit('results', {'d': data}, 'SERVER');
    });
});
   	})});
}

function restart_server(server_host, server_port){
	server.close()
	start_server(server_host, server_port);
}

exports.start = start_server;
exports.restart = restart_server;
exports.express_app = express_app;