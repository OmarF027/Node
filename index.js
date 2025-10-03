const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = "";

  if (req.url === "/") {
    filePath = path.join(__dirname, "index.html");
  } else if (req.url === "/about") {
    filePath = path.join(__dirname, "about.html");
  } else if (req.url === "/contact-me") {
    filePath = path.join(__dirname, "contact-me.html");
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

server.listen(8080, () => {
  console.log("Server in esecuzione su http://localhost:8080/");
});
