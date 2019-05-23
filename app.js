const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);


//CORS middleware
app.use((req, res, next) => {
    res.header({ "Access-Control-Allow-Origin": "*" })
    res.header({ "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"});
    res.header({ "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"})
    next();
   });

//Routes
app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res, next){
    res.sendFile(__dirname + '/index.html');
});

//Socket.io connection
io.on("connection", function(client){
    //back end logging when client connects
    console.log("Client connected...");

    client.on("join", function(data){
        console.log("data", data);
        client.emit("messages", "Hello from server.");
    });
});

//server listen with a callback
server.listen(4200, () => {
    console.log("I am running!");
});

 