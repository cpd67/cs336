var express = require('express');

var app = express();

app.get('/changed', function (req, res) {
	res.send('Hello, Galaxy!');
});

app.use(express.static('public'));

app.listen(3000, function () {
	console.log('I\'m listening on port 3000!');	
});

