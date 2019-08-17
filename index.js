// var express = require('express')
// var serveStatic = require('serve-static')
//
// var app = express()
//
// app.use(serveStatic('public/ftp', { 'index': ['default.html', 'default.htm'] }))
// app.listen(3000)
var express    = require('express')
var serveIndex = require('serve-index')
var path = require('path')
var serveStatic = require('serve-static')
var app = express()
var port = process.env.PORT || 3000;
/**for files */
app.use(serveStatic(path.join(__dirname, 'public')));
/**for directory */
app.use('/', express.static('public'), serveIndex('public', {'icons': true}))

// Listen
app.listen(port,  function () {
  console.log('listening on port:',+ port );
})
// const http = require('http');
// const fs = require("fs");
//
// http.createServer(function(request, response) {
//
// 	if(request.url === "/index"){
// 		sendFileContent(response, "index.html", "text/html");
// 	}
// 	else if(request.url === "/"){
// 		response.writeHead(200, {'Content-Type': 'text/html'});
// 		response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
// 	}
// 	else if(/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())){
// 		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
// 	}
// 	else if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
// 		sendFileContent(response, request.url.toString().substring(1), "text/css");
// 	}
// 	else{
// 		console.log("Requested URL is: " + request.url);
// 		response.end();
// 	}
// }).listen(3000);
//
// function sendFileContent(response, fileName, contentType){
// 	fs.readFile(fileName, function(err, data){
// 		if(err){
// 			response.writeHead(404);
// 			response.write("Not Found!");
// 		}
// 		else{
// 			response.writeHead(200, {'Content-Type': contentType});
// 			response.write(data);
// 		}
// 		response.end();
// 	});
// }
