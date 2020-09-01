import React, { useState } from 'react';
import "../resources/Login.css"

const useInput =initialValue =>{
    const [id,setId]=useState(initialValue);
    const [password,setPassword]=useState();
    const onChange = e=>{
        console.log(e.taget);
    }

    return {id,password,onChange};
}
function Login(){
    const log = useInput();

    return(
        <div class="login-page">
            <div class="form">

             
                <input {...log} placeholder="username" />
                <input type="password" placeholder="password" onChange={log.onChange}/>
                <button>login</button>
                
            </div>
        </div>
    );
}

export default Login;
