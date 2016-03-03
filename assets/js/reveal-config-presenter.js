//(function() {

  Reveal.initialize({

  });

  var socket = io.connect(':3000');
  Reveal.addEventListener('slidechanged', function(evt) {

    socket.emit('slidechanged', evt);

  });

//})();
