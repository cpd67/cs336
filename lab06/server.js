var express = require('express');
var bodyParser = require('body-parser');
var httpStatus = require('http-status-codes');

var server = express();

server.get('/', function(req, res) {
	res.send('Hello, world!');
});

server.get('/request', function(req, res) {
	res.sendStatus(httpStatus.OK);
});

server.head('/request', function(req, res) {
	res.sendStatus(httpStatus.OK);
});

server.post('/request', function(req, res) {
	res.sendStatus(httpStatus.OK);
});

server.post('/forms', function(req, res) {
	res.send("Got request:<br>" + "Name: " + req.user_name 
			+ "<br>Email: " + req.user_mail + "<br>Message: " 
			+ req.user_message);
});

server.put('/request', function(req, res) {
	res.sendStatus(httpStatus.CREATED);
});

server.delete('/request', function(req, res) {
	res.sendStatus(httpStatus.GONE);
});

server.use(express.static('public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.all('*', function(req, res) {
	res.sendStatus(httpStatus.FORBIDDEN);
});

server.listen(3000, function() {
	console.log('I\'m listening on port 3000!');
});
