var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/src/index.html');
});

var server = app.listen(8082, function() {

  var port = server.address().port;

  console.log('http server listening @: ' + port)
});
