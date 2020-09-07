const express = require('express');
const app = express();
const api = require('./routes/index');
const login = require('./routes/login')
const cors = require('cors');  //크로스 도메인 에러를 막기위한 라이브러리 


app.use(cors());
app.use('/api', api); // api주소로 들어왔을떄 api컴포넌트 사용 
app.get('/',function(req,res){
    res.send("dsfsd")
})
const port = 3002;
app.listen(port, ()=>console.log(`Listening on port ${port}`));  