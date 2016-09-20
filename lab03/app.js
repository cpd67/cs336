
/**
 * app.js contains the code from the Express "Hello World" tutorial.
 * Student name: Chris Dilley (cpd5).
 * Date: 09/20/16 (Start date).
 */

var express = require('express');
var app = express();

//You can change the route by modifying the first parameter to the get() function.
//In here, I changed it from the root directory ('/') to '/changed'.
app.get('/changed', function (req, res) {
	//You can modify the output text by modifying the parameter to the send() function.
	//In here, I changed it from "Hello World!" to "Hello, Galaxy!".
	res.send('Hello, Galaxy!');
});

//The express.static() function allows you to serve up static files, like a text file.
//The app.use() function tells the application to use the express function, 
//and then specify a mount path for the files that are from the directory passed to 
//the express.static() function. 
app.use(express.static('public'));

//You can change the port by modifying the first parameter to the listen() function.
//In here, I changed it from 3000 to 3100.
app.listen(3100, function () {
	//Needed to change this in order to reflect the change to the port number.
	console.log('Example app listening on port 3100!');	
});

