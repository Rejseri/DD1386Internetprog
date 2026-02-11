import http from "http";
import fs from "fs";

const requestHandler = (req, res) => {
    res.end("Labb2 part3: Server is online!");
  // TODO: serve all static files: chomp.html, chomp.css and chomp.js
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
