var express = require('express');
var path = require('path');
var app = express();
  
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, 'dist')));

var server = app.listen(8082, function () {
  
    var host = server.address().address;
    var port = server.address().port;
  
    console.log('Listening at http://%s:%s', host, port)
  
});
