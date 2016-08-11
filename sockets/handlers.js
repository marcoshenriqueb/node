var handlers = function(client){
  console.log('Client connected...');
  client.on('disconnect', function() {
      console.log('user disconnected');
  });
}
module.exports = handlers;
