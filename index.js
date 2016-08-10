var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mustacheExpress = require('mustache-express');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Node.js', message: 'Express + Socket.io'});
});

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
    });

});

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
