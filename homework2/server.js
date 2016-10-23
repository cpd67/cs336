/**
 * server.js contains the code needed in order to do homework1 for CS-336.
 * Student name: Chris Dilley (cpd5).
 * Date: 10/03/16 (Start date).
 * The tutorial found here was extremely helpful: http://expressjs.com/en/guide/routing.html
 */

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//http://www.w3schools.com/js/js_arrays.asp
//http://stackoverflow.com/questions/11427451/storing-json-value-in-javascript-array
var data = [ { firstname: 'Sir Edmond', lastname: 'Jones', loginID: 1, startDate: '10/20/2000'},
			 { firstname: 'David', lastname: 'Son', loginID: 2, startDate: '08/19/2010'},
			 { firstname: 'Sarah', lastname: 'Smiles', loginID: 3, startDate: '10/3/2015'} ];

//Give the user a welcome message when they reach root
app.get('/', function (req, res) {
	res.send('Hello, World!');
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//List all people objects (/people)
app.get('/people', function(req, res) {
	//http://expressjs.com/en/4x/api.html#res.json
	//Send all data from the dataset array to the user
	res.json(data);
});

//Get the full record for the person with the given ID (/person/id)
app.get('/person/:id', function(req, res) {
	var person;
	//http://stackoverflow.com/questions/18238173/javascript-loop-through-json-array
	//Iterate through the dataset
	for(var i = 0; i < data.length; i++) {
		//https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
		//If the login ID is equal to the passed ID...
		if(data[i].loginID == req.params.id) {
			//Store the record of the person
			person = data[i];
		}
	}
	//http://stackoverflow.com/questions/2647867/how-to-determine-if-variable-is-undefined-or-null
	//If we didn't find the person...
	if(person == null) {
		//http://expressjs.com/en/4x/api.html#res.sendStatus
		res.sendStatus(404);
	} else {
		//Send the person information
		res.json(person);
	}
});

//Get the full name (first and last) for the person with the given ID (/person/id/name)
app.get('/person/:id/name', function(req, res) {
	var firstName, lastName;
	//Iterate through the dataset
	for(var i = 0; i < data.length; i++) {
		//If the login ID is equal to the id that was passed by the GET request...
		if(data[i].loginID == req.params.id) {
			//Store the first and last name
			firstName = data[i].firstname;
			lastName = data[i].lastname;
		}
	}

	//If either variable is null...
	if(firstName == null || lastName == null) {
		res.sendStatus(404);
	} else {
		//Send the name
		res.send(firstName + " " + lastName);
	}
});

//Seniority (number of years with the organization) of the person with the given ID (/person/id/years)
//Help from http://jsfiddle.net/codeandcloud/n33RJ/ was obtained in order to work out the calculations
//for the years worked
app.get('/person/:id/years', function(req, res) {
	//Get today's date
	var todayDate = new Date();
	var startDate, calcDate, years;
	//Iterate through the dataset
	for(var i = 0; i < data.length; i++) {
		//If the login ID equals the one passed...
		if(data[i].loginID == req.params.id) {
			//Store the start date of the person
			startDate = data[i].startDate;
		}
	}

	//If we haven't found the start date...
	if(startDate == null) {
		res.sendStatus(404);
	} else {
		//Calculate the years worked
		calcDate = new Date(startDate);
		years = todayDate.getFullYear() - calcDate.getFullYear();
		var month = todayDate.getMonth() - calcDate.getMonth();
		if (month < 0 || (month === 0 && todayDate.getDate() < calcDate.getDate())) {
        	years--;
    	}
		//http://www.w3schools.com/jsref/jsref_tostring_number.asp
		//Send the result
		res.send("Years: " + years.toString());
	}
});

////////////////Homework 2/////////////////////

app.get('/individual', function(req, res) {
		var id = req.query.personID;
		var person;
		for(var i = 0; i < data.length; i++) {
			if(data[i].loginID == id) {
				person = data[i];
			}
		}

		if(person == null) {
			res.sendStatus(404);
		} else {
			res.send(person);
		}
});

/**
 *
 *
 */
app.post('/add', function(req, res) {
	var first = req.body.first;
	var last = req.body.last;
	var login = req.body.login;
	var date = req.body.date;
	var newPerson = { firstname: first, lastname: last, loginID: login, startDate: date};
	//http://www.w3schools.com/jsref/jsref_push.asp
	data.push(newPerson);
});

/**
 *
 * http://stackoverflow.com/questions/12142652/what-is-the-usefulness-of-put-and-delete-http-request-methods
 */
app.put('/put/:id', function(req, res) {
	for(var i = 0; i < data.length; i++) {

	}
});

app.delete('/remove/:id', function(req, res) {
	var person, index;
	for(var i = 0; i < data.length; i++) {
		if(data[i].loginID == req.params.id) {
			person = data[i];
			index = i;
		}
	}

	if(person == null) {
		res.sendStatus(404);
	} else {
		data.splice(index, 1);
		console.log(person);
	}
});

//Listen on port 3000
app.listen(3000, function () {
        console.log('I\'m listening on port 3000!');
});
