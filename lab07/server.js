var express = require('express');

var server = express();

const PORT = 3000;

server.get('/', function(req, res) {
	res.send('Hello, world!');
});

server.use(express.static('public'));

server.listen(PORT, function() {
	console.log('I\'m listening on port 3000');
});
