import React, { useState } from 'react';
import "../resources/Login.css"
import { useHistory } from 'react-router-dom';
////////////////////////////////////////////////변경될 폼입니다 ////////////////////////////////////////////////
const useInput =initialValue =>{
    const history = useHistory()

    const [password,setPassword]=useState(initialValue);
    const [password2,setPassword2]=useState(initialValue);
    const onChange = e=>{
        if(e.target.id==="password"){
            setPassword(e.target.value)
        }else if(e.target.id==="password2"){
            setPassword2(e.target.value)
        }
    }
    const updateClick = e=>{
        let id = window.sessionStorage.getItem("id") // 세션에 저장된 아이디
        console.log("세션 아이디:", id)
        console.log("기존 비밀번호:", password)
        console.log("변경 비밀번호:", password2)

        if(password === undefined || password2 === undefined){
            alert("모두 입력해주세요")
            return;
        }else if(password === password2){
            alert("기존 비밀번호와 변경 비밀번호가 일치합니다.")
            return;
        }

        fetch('http://localhost:3002/api/members',{
            method: 'put',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body:JSON.stringify({id:id, pw:password, pw2:password2})
        })
        .then(res => res.json())
        .then(data => {
            if(data.result === -1){
                alert("아이디, 비밀번호 불일치")
            }else if(data.result){
                alert("비밀번호 변경 성공")
                history.push('/main'); // 메인 페이지로 이동
            }
        });  
    }
    return {password,password2,onChange,updateClick};
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

                <input onChange={log.onChange} type="password" placeholder="기존 비밀번호 입력"  id="password"/>
                <input onChange={log.onChange} type="password" placeholder="변경할 비밀번호 입력"  id="password2"/>
                <button onClick={log.updateClick}>Update</button>
                <div className="space"></div>
                <button onClick={back}>back</button>
                
            </div>
        </div>
    );
}
////////////////////////////////////////////////변경될 폼입니다 ////////////////////////////////////////////////
export default Login;
