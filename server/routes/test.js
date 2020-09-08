const express = require('express')
const router = express.Router();

var count = 0;
var data = [    {time:"23:00:00", temp: 37.8, memo: ''}
]
function sendData(){
    count++;
    data.push({  // 'data'가 요청이 들어왔을때 modelData에 현재 온도 값과 시간 푸쉬
    time:"23:00:00", temp: count, memo: ''
    })
    
    return count

}

router.get('/',function(req,res){
    
    sendData()
    res.send(data)
})


module.exports = router;