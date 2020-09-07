import React, { useState } from 'react';
import "../resources/Login.css"
////////////////////////////////////////////////변경될 폼입니다 ////////////////////////////////////////////////
const useInput =initialValue =>{
    const [id,setId]=useState(initialValue);
    const [password,setPassword]=useState();
    const onChange = e=>{
        console.log(e.taget);
    }
    const loginClick = e=>{

        fetch('http://localhost:3002/api/login')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            
        });  
    }
    return {id,password,onChange,loginClick};
}
function Login(){
    const log = useInput();

    return(
        <div class="login-page">
            <div class="form">

             
                <input {...log} placeholder="username" />
                <input type="password" placeholder="password" onChange={log.onChange}/>
                <button onClick={log.loginClick}>login</button>
                
            </div>
        </div>
    );
}
////////////////////////////////////////////////변경될 폼입니다 ////////////////////////////////////////////////
export default Login;
