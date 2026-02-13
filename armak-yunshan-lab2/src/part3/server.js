import http from "http";
import fs from "fs";

const requestHandler = (req, res) => {
  // TODO: serve all static files: chomp.html, chomp.css and chomp.js

  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, {"Content-Type": "text/html"}) // MIME-type
    res.end(fs.readFileSync("chomp.html"));
  } 
  else if (req.url === "/chomp.css" && req.method === "GET") {
    res.writeHead(200, {"Content-Type": "text/css"})
    res.end(fs.readFileSync("chomp.css"));
  } 
  else if (req.url === "/chomp.js" && req.method === "GET") {
    res.writeHead(200, {"Content-Type": "text/javascript"}) 
    res.end(fs.readFileSync("chomp.js"));
  }
  else {
    res.end();
  } 
};


const server = http.createServer(requestHandler);
const port = 1234;

server.listen(port, (err) => {
  if (err) {
    console.log("Error starting server", err);
  } else {
    console.log(`Server is listening on port ${port}`);
  }
});



