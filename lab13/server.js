/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

//Lab10
var MongoClient = require('mongodb').MongoClient;
var databaseConnection;

var url = 'mongodb://cs336:' + process.env.PASSWORD + '@ds021701.mlab.com:21701/cs336';

var APP_PATH = path.join(__dirname, 'dist');

var app = express();

//Establish a connection with the database.
MongoClient.connect(url, function (err, db) {
  if (err) throw err

  databaseConnection = db;
});

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {
    // Get the comments collection
    var collection = databaseConnection.collection('comments');
    // Get all documents inside of the collection
    collection.find({}).toArray(function(err, docs) {
      res.json(docs);
    });
});

app.post('/api/comments', function(req, res) {
  // NOTE: In a real implementation, we would likely rely on a database or
  // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
  // treat Date.now() as unique-enough for our purposes.
  var newComment = {
    id: Date.now(),
    author: req.body.author,
    text: req.body.text,
  };
  //Insert the new comment into the database.
  var collection = databaseConnection.collection('comments');
  collection.insert(newComment);
});

app.get('/api/comments/:id', function(req, res) {
  databaseConnection.collection("comments").find({"id": Number(req.params.id)}).toArray(function(err, docs) {
    if (err) throw err;
    res.json(docs);
  });
});

app.put('/api/comments/:id', function(req, res) {
  var updateId = Number(req.params.id);
  var update = req.body;

  databaseConnection.collection('comments').updateOne(
    { id: updateId },
    { $set: update },
    function(err, result) {
      if (err) throw err;
      databaseConnection.collection("comments").find({}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
      });
    });
});

app.delete('/api/comments/:id', function(req, res) {
  databaseConnection.collection('comments').deleteOne(
    {'id': Number(req.params.id)},
    function(err, result) {
      if (err) throw err;
      databaseConnection.collection("comments").find({}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
      });
    });
});

app.use('*', express.static(APP_PATH));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
