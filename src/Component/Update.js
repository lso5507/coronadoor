import React, { useState } from 'react';
import "../resources/Update.css"
import { useHistory } from 'react-router-dom';
// import { delete } from '../../server/routes/members';

const useInput =initialValue =>{
    const history = useHistory()

    const [updatePw,setUpdatePw]=useState(initialValue);
    const [updatePw2,setUpdatePw2]=useState(initialValue);
    const [deletePw,setDeletePw]=useState(initialValue);
    const onChange = e=>{
        if(e.target.id==="updatePw"){
            setUpdatePw(e.target.value)
        }else if(e.target.id==="updatePw2"){
            setUpdatePw2(e.target.value)
        }
        else if(e.target.id==="deletePw"){
            setDeletePw(e.target.value)
        }
    }
    const updateClick = e=>{
        let id = window.sessionStorage.getItem("id") // 세션에 저장된 아이디
        console.log("세션 아이디:", id)
        console.log("기존 비밀번호:", updatePw)
        console.log("변경 비밀번호:", updatePw2)

        if(updatePw === undefined || updatePw2 === undefined){
            alert("모두 입력해주세요")
            return;
        }else if(updatePw === updatePw2){
            alert("기존 비밀번호와 변경 비밀번호가 일치합니다.")
            return;
        }

        fetch('http://localhost:3002/api/members',{
            method: 'put',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body:JSON.stringify({id:id, pw:updatePw, pw2:updatePw2})
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
    const deleteClick = e=>{
        let id = window.sessionStorage.getItem("id") // 세션에 저장된 아이디
        console.log("세션 아이디:", id)
        console.log(deletePw)


        if(deletePw === undefined){
            alert("비밀번호를 입력해주세요")
            return;
        }
        if (window.confirm('정말 회원탈퇴 하시겠습니까? 되돌리지 못합니다.')) {
            fetch('http://localhost:3002/api/members',{
                method: 'delete',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body:JSON.stringify({id:id, pw:deletePw})
            })
            .then(res => res.json())
            .then(data => {
                if(data.result){
                    alert("회원탈퇴 성공")
                    window.sessionStorage.removeItem("id"); // 세션 삭제
                    history.push('/'); // 로그인 페이지로 이동
                }else{
                    alert("비밀번호가 일치하지 않습니다.")
                }
            });  
            
          } else {
            // Do nothing!
            alert("취소하였습니다.");
          }


    }
    return {updatePw,updatePw2,deletePw,onChange,updateClick,deleteClick};
}

function Update(){
    const log = useInput();
    /* ----------------useHistory를 사용하여 이동-------------- */
    const history = useHistory()
    const back = ()=>{
        history.goBack();
    }
    /* ----------------useHistory를 사용하여 이동-------------- */
    return(
        <div className="contents">
            <div className="update-page">
                <div className="form">

                    <input onChange={log.onChange} type="password" placeholder="기존 비밀번호 입력"  id="updatePw"/>
                    <input onChange={log.onChange} type="password" placeholder="변경할 비밀번호 입력"  id="updatePw2"/>
                    <button onClick={log.updateClick}>Update</button>
                    <div className="space"></div>
                    <button onClick={back}>back</button>
                    
                </div>
            </div>
            <div className="delete-page">
                <div className="form">

                <input onChange={log.onChange} type="password" placeholder="password"  id="deletePw"/>
                <button onClick={log.deleteClick}>Delete</button>
                <div className="space"></div>
                <button onClick={back}>back</button>
                
                    
                </div>
            </div>
        </div>
    );
}

export default Update;
