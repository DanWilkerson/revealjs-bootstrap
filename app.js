var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var basicAuth = require('basic-auth');
var fs = require('fs');
var currentSlide = 0;

/* Configs */
var port = 3000;
var presenterUsername = 'presenter';
var presenterPassword = 'notasecret';
/* End Configs */

app.set('view engine', 'ejs');

app.use('/js', express.static(__dirname + '/assets/js'));
app.use('/css', express.static(__dirname + '/assets/css'));
app.use('/img', express.static(__dirname + '/assets/img'));

app.get('/', function(req, res) {

  var slideCount = fs.readdirSync(__dirname + '/views/partials/slides')
  .filter(function(file) {

    return file.match(/^slide\d+\.html/i);

  }).length;


  res.render('index', {
    view: 'attendee',
    slideCount: slideCount
  });

});

app.get('/presenter', auth, function(req, res) {

  var slideCount = fs.readdirSync(__dirname + '/views/partials/slides')
  .filter(function(file) {

    return file.match(/^slide\d+\.html/i);

  }).length;

  res.render('index', {
    view: 'presenter',
    slideCount: slideCount
  });

});

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

// Simple authentication to prevent hijacking
function auth(req, res, next) {

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  }

  if (user.name === presenterUsername && user.pass === presenterPassword) {
    return next();
  } else {
    return unauthorized(res);
  }

  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  }

}
