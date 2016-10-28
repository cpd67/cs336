/**
 * server.js contains the code needed in order to do homework2 for CS-336.
 * Student name: Chris Dilley (cpd5).
 * Date: 10/23/16 (Start date).
 * The following resources were helpful:
 * Express routing tutorial: http://expressjs.com/en/guide/routing.html
 * AJAX deferred tutorial: http://jqfundamentals.com/chapter/ajax-deferreds
 * Keeping track of which HTTP methods are idempotent and nullipotent: http://restcookbook.com/HTTP%20Methods/idempotency/
 * Returning a status code from an idempotent method: http://stackoverflow.com/questions/4088350/is-rest-delete-really-idempotent
 * Status code for a "failed" POST request: http://stackoverflow.com/questions/25541203/http-response-code-when-resource-creation-post-fails-due-to-existing-matching-re?noredirect=1&lq=1
 */

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//http://www.w3schools.com/js/js_arrays.asp
//http://stackoverflow.com/questions/11427451/storing-json-value-in-javascript-array
var data = [ { firstname: 'Sir Edmond', lastname: 'Jones', loginID: 1, startDate: '10/20/2000'},
			 { firstname: 'David', lastname: 'Son', loginID: 2, startDate: '08/19/2010'},
			 { firstname: 'Sarah', lastname: 'Smiles', loginID: 3, startDate: '10/3/2015'} ];

///////////////Homework 1 ///////////////////

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

//GET method that retrieves a person from our database
//and used in tandem with the AJAX call of the second new webpage
app.get('/person', function(req, res) {
		//Get the ID passed from the form
		var id = req.query.personID;
		var person;
		for(var i = 0; i < data.length; i++) {
			if(data[i].loginID == id) {
				person = data[i];
			}
		}

		//Did we find the person?
		if(person == null) {
			//Not found!
			res.sendStatus(404);
		} else {
			//Found!
			res.send(person);
		}
});

//POST method that creates new people
app.post('/people', function(req, res) {
	//Get the passed form data
	var first = req.body.first;
	var last = req.body.last;
	var login = req.body.login;
	var date = req.body.date;

	//If some data is missing...
	if(first == '' || last == '' || login == '' || date == '') {
		console.log("Some data is missing!");
		console.log("Can't create Person...");
		//We can't create a new person! Send a conflict status code.
		res.sendStatus(409);
		return;
	}

	//Check if the login ID is already in the "database"
	for(var i = 0; i < data.length; i++) {
		if(data[i].loginID == login) {
			//http://stackoverflow.com/questions/25541203/http-response-code-when-resource-creation-post-fails-due-to-existing-matching-re?noredirect=1&lq=1
			//The user already exists, send a conflict status code.
			console.log("Person already exists with that login ID!");
			console.log(data[i]);
			res.sendStatus(409);
			return;
		}
	}

	//Everything seems okay. Go ahead with the addition of the person.
	var newPerson = { firstname: first, lastname: last, loginID: login, startDate: date};
	//http://www.w3schools.com/jsref/jsref_push.asp
	//https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html
	data.push(newPerson);
	res.sendStatus(200);
});


//http://stackoverflow.com/questions/12142652/what-is-the-usefulness-of-put-and-delete-http-request-methods
//PUT method that updates the first name of a person (tested with curl)
app.put('/person/:id/:first', function(req, res) {
	var person, index;
	//Get the first name of the person
	var newName = req.params.first;
	for(var i = 0; i < data.length; i++) {
		if(data[i].loginID == req.params.id) {
			person = data[i];
			index = i;
		}
	}

	//Is the person in the database?
	if(person == null) {
		//Not found!
		res.sendStatus(404);
	} else {
		//Found!
		data[index].firstname = newName;
		res.sendStatus(201);
	}
});

//DELETE method that removes a person from our "database" (tested with curl)
app.delete('/person/:id', function(req, res) {
	var person, index;
	for(var i = 0; i < data.length; i++) {
		if(data[i].loginID == req.params.id) {
			person = data[i];
			index = i;
		}
	}

	//Did we find the person?
	if(person == null) {
		//Nope!
		res.sendStatus(404);
	} else {
		//http://stackoverflow.com/questions/5767325/how-to-remove-a-particular-element-from-an-array-in-javascript
		//Found! Remove them from the "database"
		data.splice(index, 1);
		res.sendStatus(200);
	}
});

//Listen on port 3000
app.listen(3000, function () {
        console.log('I\'m listening on port 3000!');
});
