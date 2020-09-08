// DB 설정 (로컬)
const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '0000',
    database : 'link_temp'
});


var bodyParser = require('body-parser');

const express = require('express');
const { Redirect } = require('react-router-dom');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded( {extended : true } ));


/*---------------------로그인----------------- */
router.post('/',function(req,res){
    
    var input_id = req.body.id
    var input_pw = req.body.pw

    connection.query('SELECT * from member2 where m_id=? and m_pw=?', [input_id, input_pw] ,(error, rows) => {
        if (error) throw error;
          
        if(rows.length == 1){
            console.log("로그인 성공");
            res.send({result:true})
        }else{
            console.log("로그인 실패");
            res.send({result:false})
        }    
      });
      
})
/*---------------------로그인----------------- */


/*---------------------수정----------------- */
router.put('/',function(req,res){
    var input_id = req.body.id
    var input_pw = req.body.pw
    var input_pw2 = req.body.pw2

    connection.query('SELECT * from member2 where m_id=? and m_pw=?', [input_id, input_pw] ,(error, rows) => {
        if (error) throw error;
          
        if(rows.length == 1){
            console.log("아이디 비밀번호 일치");

            // 비밀번호 변경
            connection.query("update member2 set m_pw=? where m_id=?", [input_pw2, input_id] ,(error, rows) => {
                if (error) throw error;
                console.log("비밀번호 변경")
                res.send({result:true})
            });

        }else{
            console.log("아이디 비밀번호 불일치");
            res.send({result:-1})
        }    
      });



})
/*---------------------수정----------------- */


/*---------------------탈퇴----------------- */
router.delete('/',function(req,res){
    var input_id = req.body.id
    var input_pw = req.body.pw

    connection.query('SELECT * from member2 where m_id=? and m_pw=?', [input_id, input_pw] ,(error, rows) => {
        if (error) throw error;
          
        if(rows.length == 1){
            console.log("아이디 비밀번호 불일치");
            
            // 회원탈퇴
            connection.query('delete from member2 where m_id=?', [input_id] ,(error, rows) => {
                if (error) throw error;
                console.log("회원탈퇴 성공")
                res.send({result:true}) 
              });

        }else{
            console.log("회원탈퇴 실패");
            res.send({result:false})
        }    
      });
})
/*---------------------탈퇴----------------- */





/*---------------------회원가입----------------- */
router.post('/:id',function(req,res){

    var input_code = req.body.code
    var input_id = req.body.id
    var input_pw = req.body.pw


    connection.query("select * from member2 where m_code = ? and m_id is null", [input_code] ,(error, rows) => {  // 멤버코드 확인
        if (error) throw error;
        
        if(rows.length == 1){
            console.log("사용 가능한 멤버코드 입니다");

            connection.query('SELECT * from member2 where m_id=?', input_id ,(error, rows) => {  // 아이디 중복확인
                if (error) throw error;
                
                if(rows.length == 1){
                    console.log("아이디 사용 불가 (중복)");
                    res.send({result:-2})
                }else{
                    console.log("아이디 사용 가능");

                    // 회원가입
                    connection.query("update member2 set m_id=? , m_pw=? where m_code=?", [input_id, input_pw, input_code] ,(error, rows) => {
                        if (error) throw error;
                        
                        console.log("회원가입 성공")
                        res.send({result:true})
                    });


                }    
            });

        }else{
            console.log("멤버코드가 틀렸거나 이미 사용중 입니다");
            res.send({result:-1})
        }
    });
    
})
/*---------------------회원가입----------------- */
module.exports = router;