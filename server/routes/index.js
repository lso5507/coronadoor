const express = require('express')
const router = express.Router();
const net = require('net');


var socketData=null
// 서버 생성
var server = net.createServer(function(socket){

    console.log(socket.address().address + " connected.");

    // client로 부터 오는 data를 화면에 출력
    socket.on('data', function(data){
        socketData=String(data);
        
        console.log(typeof(data), data);
        console.log('받은 데이터:' + data);
        console.log(data)
        console.log(""+data)
        console.log(String(data))
        router.get('/',function(req,res){

            res.send({status:"ok",datas:String(data)});  //현재 상태와 데이터 전달 
        
        
        })
        socket.write("lock"); // 받은 데이터 다시 전송
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