'use strict';

// npm i -g nodemon - для установки

const http = require('http');
const pageCounts = {
	home: 0,
	about: 0,
	blog: 0,
};

const server = http.createServer((req, res) => {
	const url = req.url === '/' ? 'home' : req.url.slice(1);

	const pages = {
		home: `<h1>Home Page</h1>
				<p>Vievs: ${pageCounts.home}</p>
				<a href="about" style="margin-right: 20px;">About Page</a>
				<a href="blog" >Blog Page</a>`,
		about: `<h1>About Page</h1>
				<p>Vievs: ${pageCounts.about}</p>
				<a href="home" style="margin-right: 20px;">Home Page</a>
				<a href="blog" >Blog Page</a>`,
		blog: `<h1>Blog Page</h1>
				<p>Vievs: ${pageCounts.blog}</p>
				<a href="home" style="margin-right: 20px;">Home Page</a>
				<a href="about" style="margin-right: 20px;">About Page</a>`,
		notFound: `<h1 style="font-size: 120px; color: red; text-align: center;">404 👷
				<br>Page not found<br><a href="home">🏠 Home Page</a></h1>`,
	};

	if (pages[url]) {
		++pageCounts[url];

		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
		res.end(pages[url]);
	} else {
		res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
		res.end(pages['notFound']);
	}
});

const port = 3000;

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
