const http = require('http');
const fs = require('fs');


//const hostname = '127.0.0.1';
// Set the hostname and port to work with heroku
const hostname = process.env.YOUR_HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

fs.readFile('index.html', (err, html)=>{
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
		});
	}
} );






