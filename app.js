var express = require('express');
var http = require('http');
// var app = express();
var fs = require('fs');
var slideCount = fs.readdirSync(__dirname + '/views/partials/slides').length;
var port = 3000;
var io = require('socket.io');
var app = express()
  , server = require('http').createServer(app)
  , io = io.listen(server);
app.set('view engine', 'ejs');

app.use('/js', express.static(__dirname + '/assets/js'));
app.use('/css', express.static(__dirname + '/assets/css'));

app.get('/', function(req, res) {


  res.render('index', {
    view: 'attendee',
    slideCount: slideCount
  });

});

app.get('/presenter', function(req, res) {

  res.render('index', {
    view: 'presenter',
    slideCount: slideCount
  });

});

var currentSlide = 0;
io.on('connection', function(socket) {

  socket.emit('slidechanged', {
    indexh: currentSlide
  });

  socket.on('slidechanged', function(evt) {

    currentSlide = evt.indexh;
    io.emit('slidechanged', evt);

  });

  setInterval(function() {

    socket.emit('slidechanged', {
      indexh: currentSlide
    });

  }, 1000);

});

server.listen(port, function(err) {

  if(err) console.log(err);

  console.log('Listening on port ' + port);

});
