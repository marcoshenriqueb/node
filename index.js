var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mustacheExpress = require('mustache-express');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', './views');
app.use(express.static('public'));
app.use(require('./controllers'));

io.on('connection', function(client) {
    require('./sockets/handlers')(client);
});

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
