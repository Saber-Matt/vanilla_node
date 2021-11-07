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

  //Choose the handler this request should go to. If one is not found, use the not found handler
  let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

//Construct data object to send to the handler
let data = {
  'trimmedPath' : trimmedPath,
  'queryStringObject' : queryStringObject,
  'method' : method,
  'headers' :headers,
  'payload' : buffer
};

//Route the request to the handler specified in the router
chosenHandler(data, function(statusCode, payload){
  //Use the status code called back by the handler, or default to 200
statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
  //Use the payload called back by the handler, or default to an empty object
  payload = typeof(payload) == 'object' ? payload : {};

  //Convert the payload to a string
  const payloadString = JSON.stringify(payload);

  //Return the response
  res.setHeader('Content-Type', 'application/json')
  res.writeHead(statusCode);
  res.end(payloadString);

  //Log the request path
  console.log('Returning this response: ', statusCode, payloadString);
});

//Send the response
res.end('Hello World\n');

//Log the request path
//console.log('Request received on path: '+trimmedPath+ 'with method:'+method+ ' and with these query string paramaters', queryStringObject);
//console.log('Request received with these headers', headers)
//console.log('Request received with this payload: ', buffer);

});
});

//Start server and listen on port 3000
server.listen(3000,function(){
  console.log('The server is listening on port 3000 now');
});

//Define the handlers
let handlers = {};

//Sample handler
handlers.sample = function(data, callback){
  //Callback a http status code, and a payload object
  callback(406, {'name' : 'sample handler'});
};

//Not found handler
handlers.notFound = function(data, callback){
 callback(404);
};

//define a request router
let router = {
  'sample' : handlers.sample
};