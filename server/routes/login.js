const express = require('express')
const router = express.Router();

router.get('/',function(req,res){
    const data = [{text:"테스트입니다"}]
    res.send(data)
})




module.exports = router;