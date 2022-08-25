/*

So what I want to do is this:
- Make an api request to the third-pary api. From my server.
- Then when I have that data, I can send it to the client side.
- Make my own api and with an api end point (to stay within the CORS bountried..) I could use express for that
- Test it, make a request from Postman to my api end point and see if it responsds.
- Once that is working, when my api recives a request will make an request for a third party api
- Wait for the response... (could use AJAX asynchrounous js..)
- Then when the server recives the response from the third party api, use that to send it to my web page.
- That should do the trick ;)

*/


// Get some necessary build-in modules
const http = require('http');
const https = require("https");
const fs = require('fs');
const Stream = require("stream").Transform;




// Set the hostname and port to work with heroku
//const hostname = '127.0.0.1';
const hostname = process.env.YOUR_HOST || '0.0.0.0';
const port = process.env.PORT || 3000;


// Third party API Address
let apiEndPoint = "https://dog.ceo/api/breeds/image/random";


// Define the Server
const server = http.createServer((req, res) => {

	// Request
	console.log(" ");
	console.log(" ");
	console.log("REQUEST RECIVED");


	console.log("req.url=", req.url);


	// Response

	// Server the files

	// Routing to the file
    let path = 'public/';
    switch(req.url) {
      case '/':
        path += 'index.html';
        res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
        break;
      case '/public/js/main.js':
        path += 'js/main.js';
        res.statusCode = 200;
		res.setHeader('Content-Type', 'application/javascript');
        break;
	 case '/whoLetTheDogsOut':
	 	res.statusCode = 200;
		// Call a third party api:
		apiRequest(apiEndPoint);
		res.end();
	  	break;
      default:
        path += '404.html';
        res.statusCode = 404;
    }


	// Check if I have a valid path
	if (!(path==='public/')){
		// send files
		console.log("Before readFile() method:");
		console.log("path=", path);
		fs.readFile(path, (err, data) => {
		  if (err) {
			console.log(err);
			res.end();
		  }
		  res.write(data);
		  res.end();
		});
	}




	// Listen for client fetch() request






});




// Start the server at the http://hostname:port specified
server.listen(port, hostname, () => {
	console.log("...................................................................");
	console.log("Is run first!");
	console.log(`Server running at http://${hostname}:${port}/`);

});







// Define functions
function apiRequest(apiUrl){

		//- Make an api request to the third-pary api. From my server.
		https
		  .get(apiUrl, resp => {
			let data = "";

			// A chunk of data has been recieved.
			resp.on("data", chunk => {
			  data += chunk;
			});

			// The whole response has been received. Print out the result.
			resp.on("end", () => {
			  let url = JSON.parse(data);
			  console.log("Dog API end point url=",url);
			});

		  })
		  .on("error", err => {
			console.log("Hmm something terible went wrong.");
			console.log("Error: " + err.message);
		  });

		  return 0;

}










