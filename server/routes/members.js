
var bodyParser = require('body-parser');

const express = require('express')
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded( {extended : true } ));


/*---------------------로그인----------------- */
router.post('/',function(req,res){
    
    var paramId = req.body.id
    var parampwd = req.body.pw
    

    var data = [{result:false}]
    if(paramId=="root" && parampwd=="1234"){
        var data = [{result:"true"}]
    }
    
    res.send(data)
})
/*---------------------로그인----------------- */


/*---------------------수정----------------- */
router.put('/',function(req,res){
    const data = [{text:"테스트입니다"}]
    var paramId = req.body.id
    console.log(paramId);
    res.send(data)
})
/*---------------------수정----------------- */


/*---------------------탈퇴----------------- */
router.delete('/',function(req,res){
    const data = [{text:"테스트입니다"}]
    var paramId = req.body.id
    console.log(paramId);
    res.send(data)
})
/*---------------------탈퇴----------------- */





/*---------------------회원가입----------------- */

router.post('/:id',function(req,res){
    const data = [{text:"테스트입니다"}]
    var paramId = req.body.id
    var parampwd = req.body.pw
    console.log(paramId);
    res.send(data)
})
/*---------------------회원가입----------------- */
module.exports = router;