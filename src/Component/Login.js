import React, { useState } from 'react';
import "../resources/Login.css"
import { useHistory, Redirect } from 'react-router-dom';


////////////////////////////////////////////////변경될 폼입니다 ////////////////////////////////////////////////
const useInput =initialValue =>{
    const history = useHistory()

    const [id,setId]=useState(initialValue);
    const [password,setPassword]=useState();
    const onChange = e=>{
        if(e.target.name === "id"){
            setId(e.target.value) 
        }else if(e.target.name === "pw"){
            setPassword(e.target.value)
        }
    }
    const loginClick = e=>{
        console.log("아이디:", id)
        console.log("비밀번호:", password)

        if(id === undefined){
            alert("아이디를 입력해주세요")
            return
        }else if(password === undefined){
            alert("비밀번호를 입력해주세요")
            return
        }

        fetch('http://localhost:3002/api/members',{
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body:JSON.stringify({id:id,pw:password})
        })
        .then(res => res.json())
        .then(data => {
            if(data.result){ 
                window.sessionStorage.setItem("id", id) // 세션 설정
                history.push('/main'); // 메인 페이지로 이동
                // history.replace('/main');
            }else{
                alert("아이디 또는 비밀번호가 틀립니다.")
            }  
        });  
    }
    return {id,password,onChange,loginClick};
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
                <button onClick={log.loginClick}>login</button>
                <div className="space"></div>
                <button onClick={join}>Join</button>
                
            </div>
        </div>
    );
}
////////////////////////////////////////////////변경될 폼입니다 ////////////////////////////////////////////////
export default Login;
