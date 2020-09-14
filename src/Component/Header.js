import React, { Component } from 'react';
import "../resources/Header.css"


function chkSession () {
    var Session = window.sessionStorage.getItem("id") // 세션확인
    const tempStyle={ width: "100%" }
    
    if(!Session){ return    <div id="Header">
                                <div id="Header-Title" style={tempStyle}> 
                                    <span className="sysTitleStyle"> 
                                        출입 자동제어 시스템
                                    </span>
                                </div>
                            </div>
    }
    else { 
        return  <div id="Header">
                    <div id="Header-Title"> 
                        <span className="sysTitleStyle">
                            출입 자동제어 시스템
                        </span>
                    </div>
                    <div id="Header-Login">
                        <div className="spanLogin"> 
                            <a href="/update"> 회원 정보 </a>
                        </div>
                        <div className="spanLogin"> 
                            <a href="/" onClick={Logout} className="none"> 로그아웃  </a>
                        </div>
                    </div>
                </div>
    }
}   

function Logout () { window.sessionStorage.removeItem("id") }
function Header(){ return( chkSession() ); }
export default Header;





