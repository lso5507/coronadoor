const express = require('express')
const router = express.Router();
const net = require('net');

var modelData = [  //아두이노에서 전달받을 Data값 임시 지정 //    {time:"23:00:00", temp: '37.8', memo: ''},
    {time:"23:00:00", temp: '37.8', memo: ''}

  ];
const date =  new Date();
var socketData=null
// 서버 생성
var server = net.createServer(function(socket){

    console.log(socket.address().address + " connected.");

    // client로 부터 오는 data를 화면에 출력
    socket.on('data', function(data){

        
        console.log('받은 데이터:' + data);
        socketData=String(data)
        modelData.push({  // 'data'가 요청이 들어왔을때 modelData에 현재 온도 값과 시간 푸쉬
            time:date.getDate(),
            temp:String(data),
            memo:""
        })
        console.log(modelData)
        router.get('/',function(req,res){

            res.send(modelData);  //현재 상태와 데이터 전달 
        
        
        })
        socket.write("0"); // 받은 데이터 다시 전송   1==unLock  0==임시
    });

    // client와 접속이 끊어졌을 때
    socket.on('close', function(){
        console.log('client disconnected.');
    });

});



// 에러가 발생할 경우 화면에 에러 메시지 출력
server.on('error', function(err){
    console.log('err:'+err);
});



// Port 9000으로 접속이 가능하도록 대기
server.listen(9000, function(){
    console.log('listening on 9000...');
    
    server.on('close', function(){
        console.log('server closed.');
    });

});







module.exports = router;