/**
 * server.js is a Node.js web server application that runs the CS-336 Lab05 code.
 * Student name: Chris Dilley (cpd5).
 * Start-date: 10/5/16 
 */
var express = require('express');

var app = express();

app.get('/changed', function (req, res) {
	res.send('Hello, Galaxy!');
});

app.use(express.static('public'));

app.listen(3000, function () {
	console.log('I\'m listening on port 3000!');	
});

