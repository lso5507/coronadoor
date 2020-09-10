import React, { Component } from 'react';
import "../resources/Header.css"


function CheckName (chkSession=false, chkName="관리자") {
    let user_id = window.sessionStorage.getItem("id")
    if(user_id === null){
        return "unLogin"
    }else{
        return user_id
    }
}

function CheckBtn (chkSession=false) {
    let session = chkSession //세션 체크(기본 false 비로그인)

    if (session == false) { 
        return "unBtnLogout"
    } 
    else { return "btnLogout" }
}

function Header(){
    return(
        <div id="Header">
            <div id="Header-sysName"> 
                <span className="sysNameStyle">
                    <a href="#"> 출입 자동제어 시스템 </a>
                </span>
            </div>
            <div id="Header-Login">
                <div className="span"> 
                    {CheckName()}
                </div>
                <div className="span"> 
                    <a href="#" onclick="logout()" className={CheckBtn()}> 로그아웃 </a>
                </div>
            </div>
        </div>
    );
}
export default Header;