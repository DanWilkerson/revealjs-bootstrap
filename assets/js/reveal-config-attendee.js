(function() {

  var port = window.location.port ? ':' + window.location.port : '/';
  var socket = io.connect(port);

  Reveal.initialize({
    keyboard: false,
    controls: false,
    history: false
  });

  socket.on('slidechanged', function(evt) {

    Reveal.slide(evt.indexh);

  });

})();
