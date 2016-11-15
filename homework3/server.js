/**
 * server.js contains the code needed in order to do homework3 for CS-336.
 * Student name: Chris Dilley (cpd5).
 * Date: 11/10/16 (Start date).
 * The following resources were helpful:
 * Facebook React tutorial: https://web.archive.org/web/20161019043332/https://facebook.github.io/react/docs/tutorial.html
 * CS-336 Lab 09 - https://cs.calvin.edu/courses/cs/336/kvlinden/09webpack/lab.html
 * CS-336 Lab 10 - https://cs.calvin.edu/courses/cs/336/kvlinden/10mongo/lab.html
 * Mongodb tutorials: http://mongodb.github.io/node-mongodb-native/2.2/quick-start/
 * Checking the size of a returned cursor of a find() call: https://docs.mongodb.com/v3.2/reference/method/cursor.toArray/
 */

var express = require('express');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient
var databaseConnection;

var app = express();

//Adapted from: https://expressjs.com/en/guide/database-integration.html#mongo
//Establish a connection with the database, then store the connection in a global variable.
MongoClient.connect('mongodb://cs336:PASSWORD@ds149577.mlab.com:49577/homework3', function (err, db) {
  if (err) throw err

	databaseConnection = db;
});

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//Taken from Facebook React tutorial
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest people.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//List all people objects (/people)
app.get('/people', function(req, res) {
  //Get a handle to the 'people' collection.
	var collection = databaseConnection.collection('people');

  //Get all of the people from the collection.
	collection.find({}).toArray(function(err, docs) {
		if(err) throw err;
    //Send the data
		res.json(docs);
	});
});

//Get the full record for the person with the given ID (/person/id)
app.get('/person/:id', function(req, res) {

  //https://coderwall.com/p/5tlhmw/converting-strings-to-number-in-javascript-pitfalls
  //ID number is always a String for some odd reason,
  //so change into a Number.
	var id = Number(req.params.id);

	var collection = databaseConnection.collection('people');

  //We'll have to check if the find() call returns a cursor with size 0.
  var holder = collection.find({loginID: id});
  holder.toArray(function(err, docs) {
    //Did we get no documents?
    if(docs.length == 0) {
      //Yep!
      res.sendStatus(404);
    } else {
      //No. Send the data.
      res.json(docs);
    }
  });
});

//Get the full name (first and last) for the person with the given ID (/person/id/name)
app.get('/person/:id/name', function(req, res) {
  //Get the id
	var id = Number(req.params.id);

  //Get a handle to the collection
	var collection = databaseConnection.collection('people');

  //Check if the Person is in the database
  var holder = collection.find({loginID: id});
  holder.toArray(function(err, docs) {
    //Did we find no one?
    if(docs.length == 0) {
      //Yep!
      res.sendStatus(404);
    } else {
      //No. Send the full name.
      res.send(docs[0].firstname + " " + docs[0].lastname);
    }
  });
});

//Seniority (number of years with the organization) of the person with the given ID (/person/id/years)
//Help from http://jsfiddle.net/codeandcloud/n33RJ/ was obtained in order to work out the calculations
//for the years worked
app.get('/person/:id/years', function(req, res) {
	//Get today's date
  var todayDate = new Date();
  var startDate, calcDate, years;

  var id = Number(req.params.id);

  var collection = databaseConnection.collection('people');

  //Check if the find() call returns nothing.
  var holder = collection.find({loginID: id});
  holder.toArray(function(err, docs) {
    if(docs.length == 0) {
      //Person not found!
      res.sendStatus(404);
    } else {
      //Calculate the number of years worked.
      startDate = docs[0].startDate;
      calcDate = new Date(startDate);
      years = todayDate.getFullYear() - calcDate.getFullYear();
      var month = todayDate.getMonth() - calcDate.getMonth();
      if (month < 0 || (month === 0 && todayDate.getDate() < calcDate.getDate())) {
        years--;
      }
      //Send the years.
      res.send("Years: " + years.toString());
    }
  });
});

//GET method that retrieves a person from our database
//and used in tandem with the AJAX call of the second new webpage
app.get('/person', function(req, res) {
		//Get the ID passed from the form
		var id = Number(req.query.personID);

    //Get a handle to the collection
    var collection = databaseConnection.collection('people');
    var holder = collection.find({loginID: id});

    //Check if we have found the Person
    holder.toArray(function(err, docs) {
      if(docs.length == 0) {
        //Nope!
        res.sendStatus(404);
      } else {
        //Yep!
        res.json(docs);
      }
    })
});

//POST method that creates new people
app.post('/people', function(req, res) {

	//Get the passed form data
	var first = req.body.firstname;
	var last = req.body.lastname;
	var login = Number(req.body.loginID);
	var date = req.body.startDate;

	//If some data is missing...
	if(first == '' || last == '' || login == '' || date == '') {
		console.log("Some data is missing!");
		console.log("Can't create Person...");
		//We can't create a new person! Send a conflict status code.
		res.sendStatus(409);
		return;
	}

	//Check if the login ID is already in the database
	//Everything seems okay. Go ahead with the addition of the person.
	var newPerson = { firstname: first, lastname: last, loginID: login, startDate: date};

  //We'll have to check if the Person is already in the database...
	//Get the collection of People from the database
	var collection = databaseConnection.collection('people');

  var holder = collection.find({loginID: login});

  //Check if the Person is already in the database.
  holder.toArray(function(err, docs) {
    if(docs.length > 0) {
      //Yep!
      console.log("That Person already exists!");
      console.log(docs[0]);
    } else {
      //Nope. Insert the new Person
      collection.insert(newPerson);
    }
  });
});

//PUT method that updates the first name of a person (tested with curl)
app.put('/person/:id/:first', function(req, res) {
  //Get the first name of the person
  var id = Number(req.params.id);
  var newName = req.params.first;

  var collection = databaseConnection.collection('people');

  //We need to check if the Person is even in the database
  var holder = collection.find({loginID: id});

  holder.toArray(function(err, docs) {
    //Did we find the Person?
    if(docs.length == 0) {
      //Nope!
      res.sendStatus(404);
    } else {
      //Yes. Update the name.
      collection.update({loginID: id}, { $set: {firstname: newName } });
      res.sendStatus(201);
    }
  });
});

//DELETE method that removes a person from our database (tested with curl)
app.delete('/person/:id', function(req, res) {
  //Get the id, handle to the collection, and check
  //if the Person exists in the database.
  var id = Number(req.params.id);
  var collection = databaseConnection.collection('people');
  var holder = collection.find({loginID: id});

  holder.toArray(function(err, docs) {
    if(docs.length == 0) {
      //Person does not exist!
      res.sendStatus(404);
    } else {
      //Delete the Person.
      collection.remove({loginID: id});
      res.sendStatus(200);
    }
  });
});

//Listen on port 3000
app.listen(3000, function () {
  console.log('I\'m listening on port 3000!');
});
