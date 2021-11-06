/*
*Primary File for API
*
*/

//Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

//Server should respond to all requests with a string
const server = http.createServer(function(req, res){

// Get URL and parse it
const parsedUrl = url.parse(req.url, true);

//Get the path
const path = parsedUrl.pathname;
//trim path with regex
const trimmedPath = path.replace(/^\/+|\/+$/g,'')

//get query string as an object
const  queryStringObject = parsedUrl.query;

//get HTTP Method
const method = req.method.toLocaleLowerCase();

//get headers as object
const headers = req.headers;

//get payload, if any
const decoder = new StringDecoder('utf-8');
let buffer = '';
req.on('data',function(data){
  buffer += decoder.write(data);
});
req.on('end', function(){
  buffer += decoder.end();

//Send the response
res.end('Hello World\n');

//Log the request path
//console.log('Request received on path: '+trimmedPath+ 'with method:'+method+ ' and with these query string paramaters', queryStringObject);
//console.log('Request received with these headers', headers)
console.log('Request received with this payload: ', buffer);

});
});

//Start server and listen on port 3000
server.listen(3000,function(){
  console.log('The server is listening on port 3000 now');
});