var express = require('express');

var server = express();

server.get('/request', function(req, res) {
	res.send('Hello, world!');
});

server.post('/request', function(req, res) {
	res.send('Got a POST request!');
});

server.use(express.static('public'));


server.listen(3000, function() {
	console.log('I\'m listening on port 3000!');
});
