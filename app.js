var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var basicAuth = require('basic-auth');
var fs = require('fs');

var slideOrder =[
  'title',
  'introduction',
];
var currentSlide = slideOrder[0];

slideOrder.forEach(function(filename) {

  if (!filename) return;

  var path = __dirname + '/views/partials/slides/' + filename + '.html';

  try {

    fs.readFileSync(path)

  } catch (squelch) {

    fs.writeFileSync(path, '<h3>' + formatTitle(filename) + '</h3>\n<p>Body</p>');

  }

});

/* Configs */
var port = 3000;
var presenterUsername = 'presenter';
var presenterPassword = 'notasecret';
/* End Configs */

app.set('view engine', 'ejs');

app.use('/js', express.static(__dirname + '/assets/js'));
app.use('/css', express.static(__dirname + '/assets/css'));
app.use('/img', express.static(__dirname + '/assets/img'));

app.get('/', sendPreso('attendee'));
app.get('/presenter', auth, sendPreso('presenter'));

function sendPreso(type) {

  return function(req, res) {
    res.render('index', {
      view: type,
      slideOrder: slideOrder
    });
  };

}

io.on('connection', function(socket) {

  socket.emit('slidechanged', {
    indexh: slideOrder.indexOf(currentSlide)
  });

  socket.on('slidechanged', function(evt) {

    currentSlide = slideOrder[evt.indexh];
    io.emit('slidechanged', evt);

  });

  setInterval(function() {

    socket.emit('slidechanged', {
      indexh: slideOrder.indexOf(currentSlide)
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
