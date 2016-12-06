var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/todo-mean');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

app.get('/api/todos', function(req, res) {
  Todo.find(function(err, todos) {
    if(err) {
      res.send(err)
    }
    res.json(todos);
  });
});

app.post('/api/todos', function(req, res) {
  Todo.create({
    text : req.body.text
    done : false
  }, function(err, todo) {
    if (err) {
      res.send(err);
    }
  })
})

var Todo = mongoose.model('Todo', {
  text : String
});

app.listen(8080);
console.log("App listening on port 8080");
