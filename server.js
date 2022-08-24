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


const http = require('http');
const https = require("https");
const fs = require('fs');

const Stream = require("stream").Transform;

//const hostname = '127.0.0.1';
// Set the hostname and port to work with heroku
const hostname = process.env.YOUR_HOST || '0.0.0.0';
const port = process.env.PORT || 3000;






fs.readFile('./public/index.html', (err, html)=>{
	if(err){
		throw(err);
	}else{
		const server = http.createServer((req, res) => {






		  res.statusCode = 200;
		  //res.setHeader('Content-Type', 'text/plain');
		  res.setHeader('Content-Type', 'text/html');
		  res.write(html);
		  res.end();
		});

		server.listen(port, hostname, () => {
		  console.log(`Server running at http://${hostname}:${port}/`);

			  //- Make an api request to the third-pary api. From my server.
			  https
				.get("https://dog.ceo/api/breeds/image/random", resp => {
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
	  


		});
	}
} );






