var handlers = function(client){
  console.log('User connected');
  client.on('user click', function(msg){
    client.emit('user click', "Clicked!");
  });
  client.on('disconnect', function() {
      console.log('User disconnected');
  });
}
module.exports = handlers;
