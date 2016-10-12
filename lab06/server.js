/**
 * server.js contains the code needed in order to do Lab 06 for CS-336.
 * Student name: Chris Dilley (cpd5).
 * Date: 10/12/16.
 * 
 * Answers to lab questions: 
 * 6.1a: Can test: curl --head localhost:3000/request
 * 				   curl -X GET localhost:3000/request
 * 				   curl -X PUT localhost:3000/request
				   curl -X DELETE localhost:3000/request
 * 		 Cannot test: curl -X POST localhost:3000/request
		 Reason: the server cannot handle data that is passed to it yet. 
 * 6.1b: 404 status code, as that is used when a resource (e.g. a webpage) cannot be found on a server. Attempting to fetch a page on a route 
 * 	     that is not defined should mean that the page will not be found (because the route to it is not defined), so a 404 status code should 
 * 	     be returned in order to signal that. 
 * 6.2a: GET, PUT, POST.
 * 6.2b: It is passed in the form of an HTTP request, with the body containing the data being sent. The data is not modified in any way. 
 */

//Get the necessary modules
var express = require('express');
var bodyParser = require('body-parser');
var httpStatus = require('http-status-codes');

//Fire up the server
var server = express();

//Use static files and middleware
server.use(express.static('public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get('/', function(req, res) {
	res.send('Hello, world!');
});

//GET method
server.get('/request', function(req, res) {
	res.sendStatus(httpStatus.OK);
});

//HEAD method
server.head('/request', function(req, res) {
	res.sendStatus(httpStatus.OK);
});

//POST method - Display form information on webpage.
server.post('/forms', function(req, res) {
	res.send('Got message:<br>Name: ' + req.body.user_name
			+ '<br>Email: ' + req.body.user_mail + '<br>Message: ' 
			+ req.body.user_message);
});

//PUT method
server.put('/request', function(req, res) {
	res.sendStatus(httpStatus.CREATED);
});

//DELETE method
server.delete('/request', function(req, res) {
	res.sendStatus(httpStatus.GONE);
});

//Handle all other routes
server.all('*', function(req, res) {
	res.sendStatus(httpStatus.FORBIDDEN);
});

//Listen on port 3000
server.listen(3000, function() {
	console.log('I\'m listening on port 3000!');
});
