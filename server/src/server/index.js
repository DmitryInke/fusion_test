const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const socketHandlers = require("./socketHandlers");
const routes = require("../routes");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "../../../", "client")));
app.use(routes);

socketHandlers(io);

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
