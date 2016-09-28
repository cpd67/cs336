
/**
 * server.js contains the code needed in order to run the CS-336 lab04 app.
 * Student name: Chris Dilley (cpd5).
 * Date: 09/28/16 (Start date).
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

