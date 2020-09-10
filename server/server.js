const express = require('express');
const app = express();
const check = require('./routes/check')
const test = require('./routes/test')
const members = require('./routes/members')


const cors = require('cors');  //크로스 도메인 에러를 막기위한 라이브러리 


app.use(cors());
app.use('/api/check', check); 
app.use('/api/members',members);

const port = 3002;
app.listen(port, ()=>console.log(`Listening on port ${port}`));  