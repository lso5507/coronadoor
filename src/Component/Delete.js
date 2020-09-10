import React, { useState } from 'react';
import "../resources/Login.css"
import { useHistory } from 'react-router-dom';
////////////////////////////////////////////////변경될 폼입니다 ////////////////////////////////////////////////
const useInput =initialValue =>{
    const [id,setId]=useState(initialValue);
    const [password,setPassword]=useState(initialValue);
    const onChange = e=>{

        if(e.target.id==="id"){
            setId(e.target.value)   
        }
        else if(e.target.id==="password"){
            setPassword(e.target.value)
        }

    }
    const deleteClick = e=>{

        console.log(id)
        console.log(password)

        if(id === undefined || password === undefined){
            alert("모두 입력해주세요")
            return;
        }


        fetch('http://localhost:3002/api/members',{
            method: 'delete',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body:JSON.stringify({id:id, pw:password})
        })
        .then(res => res.json())
        .then(data => {
            if(data.result){
                alert("회원탈퇴 성공")
            }else{
                alert("회원탈퇴 실패")
            }
        });  

    }
    return {id,password,onChange,deleteClick};
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

                <input onChange={log.onChange} type="text" placeholder="id"  id="id" />
                <input onChange={log.onChange} type="password" placeholder="password"  id="password"/>
                <button onClick={log.deleteClick}>Delete</button>
                <div className="space"></div>
                <button onClick={back}>back</button>
                
            </div>
        </div>
    );
}
////////////////////////////////////////////////변경될 폼입니다 ////////////////////////////////////////////////
export default Login;
