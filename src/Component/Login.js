import React, { useState } from 'react';
import "../resources/Login.css"
import { useHistory } from 'react-router-dom';


////////////////////////////////////////////////변경될 폼입니다 ////////////////////////////////////////////////
const useInput =initialValue =>{
    const [id,setId]=useState(initialValue);
    const [password,setPassword]=useState();
    const onChange = e=>{
        
    }
    const loginClick = e=>{

        fetch('http://localhost:3002/api/members',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body:JSON.stringify({id:"root",pw:"1234"})
            
            
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            
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

             
                <input {...log} placeholder="username" />
                <input type="password" placeholder="password" onChange={log.onChange}/>
                <button onClick={log.loginClick}>login</button>
                <div className="space"></div>
                <button onClick={join}>Join</button>
                
            </div>
        </div>
    );
}
////////////////////////////////////////////////변경될 폼입니다 ////////////////////////////////////////////////
export default Login;
