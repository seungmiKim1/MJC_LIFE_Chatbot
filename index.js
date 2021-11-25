var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = {};


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
    console.log('사용자가 채팅에 연결되었습니다.');

    socket.on('disconnect', function(){
        console.log('사용자와 채팅의 연결이 끊어졌습니다.');
    });

    socket.on("userMsg", (data)=>{
        console.log(data);
        io.emit("serverMsg", data);
      
    })

    socket.on("settingNickname", (nickname)=>{
        users[nickname] = socket;
        console.log( nickname);
    })
});

http.listen(3000, function(){
    console.log('listening on port 3000');
});