(function() {

  var port = window.location.port ? ':' + window.location.port : '/';
  var socket = io.connect(port);

  Reveal.initialize({
    dependencies: [
      { src: '/js/highlight.pack.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
    ],
    controls: false
  });


  Reveal.addEventListener('slidechanged', function(evt) {

    socket.emit('slidechanged', evt);

  });

})();
