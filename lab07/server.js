var express = require("express");
var bodyParser = require("body-parser");

var server = express();

const PORT = 3000;

server.use(express.static("public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get("/", function(req, res) {
	res.send("Hello, world!");
});

server.get("/hello", function(req, res) {
	//Taken from example code from the code cs336 repo that Professor Vander Linden made
	res.send( {"message" : "Hello, " + req.query.name + "!"} );
});

server.listen(PORT, function() {
	console.log('I\'m listening on port 3000');
});
