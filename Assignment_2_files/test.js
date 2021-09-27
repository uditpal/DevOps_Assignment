const http = require('http');

const server = http.createServer((request, response) => {
	response.write("<html><body><div id = 'container'>");
	response.write("<h1>This is Fucking Assignment</h1>")
	response.write("<h2>By Mithil, Dheeraj, Udit, Aryan, Rayhaan</h2>")
	response.write("</div></body></html>");
	response.write("<h2>Final Year IIIT Dharwad</h2>")
	response.end();
});

server.listen(5000, () => {
	console.log('Server is running...');
});
