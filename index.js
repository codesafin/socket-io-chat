var app = require("express")();
var httpServer = require("http").Server(app);
var sockIO = require("socket.io")(httpServer);


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

sockIO.on("connection", function(sock){
    console.log("new connection");
    sock.on("message", function(msg){
        sockIO.emit("newMessage", msg);
    });
});


httpServer.listen(process.env.PORT || 5000, function(){
    console.log('listening on *:' + 5000);
});
