import React, { useState } from 'react';
import "../resources/Login.css"
import { useHistory, Redirect } from 'react-router-dom';


////////////////////////////////////////////////변경될 폼입니다 ////////////////////////////////////////////////
const useInput =initialValue =>{
    const history = useHistory()

    const [id,setId]=useState(initialValue);
    const [password,setPassword]=useState();
    const onChange = e=>{
        if(e.target.name == "id"){
            setId(e.target.value) 
        }
        if(e.target.name == "pw"){
            setPassword(e.target.value)
        }
    }
    const loginclick = e=>{
        console.log("아이디:", id)
        console.log("비밀번호:", password)

        fetch('http://localhost:3002/api/members',{
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body:JSON.stringify({id:id,pw:password})
        })
        .then(res => res.json())
        .then(data => {
            if(data.result){ 
                console.log("로그인 성공")
                alert("로그인 성공 (메인 페이지로 이동)")

                window.sessionStorage.setItem("id", id) // 세션 설정
                // window.sessionStorage.getItem("id")

                history.push('/main'); // 메인 페이지로 이동    
            }else{
                console.log("로그인 실패")
                alert("아이디 또는 비밀번호가 틀립니다.")
            }  
        });  
    
    }
    return {id,password,onChange,loginclick};
}
function Login(){
    const log = useInput();
    /* ----------------useHistory를 사용하여 이동-------------- */
    const history = useHistory()
    const join = ()=>{
        history.push('/join')
    }
    /* ----------------useHistory를 사용하여 이동-------------- */
    return(
        <div className="login-page">
            <div className="form">

                <input {...log} placeholder="username" onChange={log.onChange} name="id"/>
                <input type="password" placeholder="password" onChange={log.onChange} name="pw"/>
                <button onClick={log.loginclick}>login</button>
                <div className="space"></div>
                <button onClick={join}>Join</button>
                
            </div>
        </div>
    );
}
////////////////////////////////////////////////변경될 폼입니다 ////////////////////////////////////////////////
export default Login;
