(function() {

  Reveal.initialize({
    keyboard: false,
    controls: false,
    history: false
  });

  var socket = io.connect(':3000');

  socket.on('slidechanged', function(evt) {

    Reveal.slide(evt.indexh);

  });

})();
