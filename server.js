/**
 * server.js contains the code needed in order to run homework1 for CS-336.
 * Student name: Chris Dilley (cpd5).
 * Date: 10/03/16 (Start date).
 */

var express = require('express');
var app = express();

app.get('/', function (req, res) {
        res.send('Hello, Galaxy!');
});

//List all people objects
app.get('/people, function(req, res) {

});

//req.params: { "id": "#" }
//Get the full record for the person with the given ID
app.get('/person/:id', function(req, res) {

});

//Get the full name (first and last) for the person with the given ID
app.get('/person/:id/name', function(req, res) {

});

//Seniority (number of years with the organization) of the person with the
//given ID (report as an age; round down to nearest whole year)
app.get('/person/:id/years', function(req, res) {

});

app.listen(3000, function () {
        console.log('I\'m listening on port 3000!');
});
