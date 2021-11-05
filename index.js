/*
*Primary File for API
*
*/

//Dependencies
const http = require('http');

//Server should respond to all requests with a string
const server = http.createServer(function(req, res){
  res.end('Hello World\n');
});

//Start server and listen on port 3000
server.listen(3000,function(){
  console.log('The server is listening on port 3000 now');
});