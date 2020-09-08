import React, { useState } from 'react';
import "../resources/Login.css"
import { useHistory } from 'react-router-dom';
////////////////////////////////////////////////변경될 폼입니다 ////////////////////////////////////////////////
const useInput =initialValue =>{
    const history = useHistory()

    const [code,setCode]=useState(initialValue);
    const [id,setId]=useState(initialValue);
    const [password,setPassword]=useState(initialValue);
    const onChange = e=>{

        if(e.target.id==="code"){
            setCode(e.target.value)   
        }
        else if(e.target.id==="id"){
            setId(e.target.value)   
        }
        else if(e.target.id==="password"){
            setPassword(e.target.value)
        }
    }
    const joinClick = e=>{

        console.log(code)
        console.log(id)
        console.log(password)

        fetch('http://localhost:3002/api/members/'+id,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body:JSON.stringify({code:code, id:id,pw:password})
        })
        .then(res => res.json())
        .then(data => {
            if(data.result == -1){
                alert("멤버코드가 틀렸거나 이미 사용중 입니다.")
            }else if(data.result == -2){
                alert("아이디 사용 불가 (중복)")
            }else if(data.result == true){
                console.log("회원가입 성공")
                alert("회원가입 성공")
                // 로그인 페이지로 이동
                history.push('/')
            }
        });  

    }
    return {id,password,onChange,joinClick};
}
function Login(){
    const log = useInput();
    /* ----------------useHistory를 사용하여 이동-------------- */
    const history = useHistory()
    const back = ()=>{
        history.goBack();
    }
    /* ----------------useHistory를 사용하여 이동-------------- */
    return(
        <div className="login-page">
            <div className="form">

                <input onChange={log.onChange} type="password" placeholder="MemberCode" id="code"/>
                <input onChange={log.onChange} type="text" placeholder="id"  id="id" />
                <input onChange={log.onChange} type="password" placeholder="password"  id="password"/>
                <button onClick={log.joinClick}>Join</button>
                <div className="space"></div>
                <button onClick={back}>back</button>
                
            </div>
        </div>
    );
}
////////////////////////////////////////////////변경될 폼입니다 ////////////////////////////////////////////////
export default Login;
