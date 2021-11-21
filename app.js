/* 설치한 express 모듈 불러오기 */
const express = require('express')

/* 설치한 socket.io 모듈 불러오기 */
const socket = require('socket.io')

/* Node.js 기본 내장 모듈 불러오기 */
const http = require('http')

/* Node.js 기본 내장 모듈 불러오기 */
const fs = require('fs')

/* express 객체 생성 */
const app = express()

/* express http 서버 생성 */
const server = http.createServer(app)

/* 생성된 서버를 socket.io에 바인딩 */
const io = socket(server)
app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

/* Get 방식으로 / 경로에 접속하면 실행 됨 */
app.get('/', function(request, response) {
  fs.readFile('./static/index.html', function(err, data) {
    if(err) {
      response.send('에러')
    } else {
      response.writeHead(200, {'Content-Type':'text/html'})
      response.write(data)
      response.end()
    }
  })
})

io.sockets.on('connection', function(socket) {

    /* 새로운 사용자가 접속하면 다른 소켓에게도 알려준다*/
    socket.on('newUser',function(name){
        console.log('새로운 채팅 사용자가 접속하였습니다.')

        /* 소켓에 이름 저장해두기*/ 
        socket.name=name

        /*모든 소켓에게 전송*/ 
        io.sockets.emit('update',{type:'connect',name:'SERVER',message:name+'님이 접속하였습니다'})
    })
 

/* 전송한 메시지 받기 */

  socket.on('message', function(data) {

    data.name=socket.name
    console.log(data)
    /* 보낸 사람을 제외한 나머지 유제에게 메시지 전송 */
    socket.broadcast.emit('update',data);
  })

/* 접속 종료 */

  socket.on('disconnect', function() {
    console.log(socket.name+'님이 채팅방을 나가셨습니다')

    /* 나가는 사람을 제외한 나머지 유저에게 메시지 전송 */
    socket.broadcast.emit('update',{type:'disconnet',name:'SERVER',message:socket.name+'님이 채팅방을 나가셨습니다'});
  })
})

/* 서버를 8080 포트로 listen */
server.listen(8080, function() {
  console.log('서버 실행 중..')
})