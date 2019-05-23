const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");

// const allowedOrigins = "localhost:* 10.1.220.19:*";

// const sio_server = io(server, {
//     origins: allowedOrigins
// })
// io.origins(["http://10.1.220.19:4200"]);


const corsOptions = {
    origin: "http://10.1.220.19:4200",
    credentials: true
};
app.use((req, res, next) => {
    res.header({ "Access-Control-Allow-Origin": "*" })
    res.header({ "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"});
    res.header({ "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"})
    next();
   });
   
app.use(cors());

//setting static folder to '/node_modules' since we have npm to give us jQuery we want to be able to useit in our html. 

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res, next){
    res.sendFile(__dirname + '/index.html');
});



io.on("connection", function(client){
    console.log("Client connected...");

    client.on("join", function(data){
        console.log(data);
    });
});

server.listen(4200);

 