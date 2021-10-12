var express = require('express') // node.js 웹 서버 프레임워크 express 
var app=express();
var http = require('http');

var bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json());

app.get('/keyboard',function(req,res){
    
    var data = {
        'type':'buttons',
        'buttons' : ['강의실 위치','부서 전화번호','학사안내'] // 챗봇 내 버튼 정보 
        };

    res.json(data);
}) 


app.post('/mseeage',function(req,res){

    var msg = req.body.content;
    console.log('전달받은 메시지:'+msg);
    
    var send = {};

    switch(msg){ // Switch문을 이용하여 test case 작성 
        case '토목과 위치':
            send ={
                'message' : {
                    'text' : '공학관 1층'
                }
            }
            break;

        case '컴퓨터공학과 위치':
            send = {
                'message' : {
                    'text' : '공학관 6층'
            }
        }
            break;

        case '정보':
            send = {
                'message' : {
                    'text' : '테스트!'
                },
            keybord : {
                'type' : 'buttons',
                'buttons' : ['테스트1','테스트2']
                }
            }
            break;
        
        default :
            send = {
                'message' : {
                    'text' : '알 수 없는 명령입니다'
            }
        }
            break;

    }
    


    res.json(send);
});

http.createServer(app).listen(9090,function(){ //9090 포트를 할당하여 웹 서버에서 보여질 수 있도록
    console.log('서버 실행 중..');
});
