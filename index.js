/*
*Primary File for API
*
*/

//Dependencies
const http = require('http');
const url = require('url');

//Server should respond to all requests with a string
const server = http.createServer(function(req, res){
  


// Get URL and parse it
const parsedUrl = url.parse(req.url, true);

//Get the path
const path = parsedUrl.pathname;
//trim path with regex
const trimmedPath = path.replace(/^\/+|\/+$/g,'')

//Send the response
res.end('Hello World\n');

//Log the request path
console.log('Request received on path: '+trimmedPath);

});

//Start server and listen on port 3000
server.listen(3000,function(){
  console.log('The server is listening on port 3000 now');
});