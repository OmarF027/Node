require('dotenv').config(); // carica le variabili
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 8080; // usa la porta dal file .env

const server = http.createServer((req, res) => {
  let filePath = "";

  if (req.url === "/") {
    filePath = path.join(__dirname, "index.html");
  } else if (req.url === "/about") {
    filePath = path.join(__dirname, "about.html");
  } else if (req.url === "/contact-me") {
    filePath = path.join(__dirname, "contact-me.html");
  } else if (req.url === "/secret-video") {
    // Redireziona al video definito nel file .env
    res.writeHead(302, { "Location": process.env.SECRET_VIDEO_URL });
    return res.end();
  } else {
    filePath = path.join(__dirname, "404.html");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Errore del server");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
