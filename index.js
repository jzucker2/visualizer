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

var rpio = require('rpio');
rpio.init({mock: 'raspi-3'});
/* Override default warn handler to avoid mock warnings */
rpio.on('warn', function() {});
rpio.open(11, rpio.INPUT);
console.log('Pin 11 is currently ' + (rpio.read(11) ? 'high' : 'low'));
var pin = 10;

/*
 * Use the internal pulldown resistor to default to off.  Pressing the button
 * causes the input to go high, releasing it leaves the pulldown resistor to
 * pull it back down to low.
 */
rpio.open(pin, rpio.INPUT, rpio.PULL_DOWN);

/*
 * This callback will be called every time a configured event is detected on
 * the pin.  The argument is the pin that triggered the event, so you can use
 * the same callback for multiple pins.
 */
function pollcb(cbpin)
{
	/*
	 * It cannot be guaranteed that the current value of the pin is the
	 * same that triggered the event, so the best we can do is notify the
	 * user that an event happened and print what the value is currently
	 * set to.
	 *
	 * Unless you are pressing the button faster than 1ms (the default
	 * setInterval() loop which polls for events) this shouldn't be a
	 * problem.
	 */
	var state = rpio.read(cbpin) ? 'pressed' : 'released';
	console.log('Button event on P%d (button currently %s)', cbpin, state);

	/*
	 * By default this program will run forever.  If you want to cancel the
	 * poll after the first event and end the program, uncomment this line.
	 */
	// rpio.poll(cbpin, null);
}

/*
 * Configure the pin for the default set of events.  If you wanted to only
 * watch for high or low events, then you'd use the third argument to specify
 * either rpio.POLL_LOW or rpio.POLL_HIGH.
 */
rpio.poll(pin, pollcb);


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
