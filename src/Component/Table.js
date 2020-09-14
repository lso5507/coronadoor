import React, { useState } from 'react';


const useInput = initialValue=>{
  const [value,setValue] = useState(initialValue);
  


  const onChange = e=>{
    setValue(e.target.value);
    e.target.innerHTML=e.target.value;
  }

  return{value,onChange};
}
 // 온도가 37.5이상이면 빨간 색으로 색칠
function Table({id,time,temp,memo}){
      const memoDatas = useInput(memo);   // useInput으로 연결
      const [value,setValue] = useState(false)
      if(parseFloat(temp)>=37.5){
      return (
  
          <tr style={{backgroundColor:"#F78181"}}  className="ContentData" >
            <td style={{display:"none"}}>{id}</td>  
            <td style={{width:"10vw"}}>{time}</td> 
            <td style={{width:"10vw"}}>{temp}</td> 
            <td colSpan="2"><input  className="memoData" {...memoDatas} placeholder="memo" style={{width:"40vw",textAlign:"left"}}></input></td>
                                        {/* 이 식은 ES6표기법 참고 onChange기능도 사용중 */}
          </tr>
     
          );
       } 
      else{
        return (
    
            <tr  className="ContentData" >
              <td style={{display:"none"}}>{id}</td>  
              <td style={{width:"10vw"}}>{time}</td> 
              <td style={{width:"10vw"}}>{temp}</td> 
              <td colSpan="2"><input  className="memoData" {...memoDatas} placeholder="memo" style={{width:"40vw",textAlign:"left"}}></input></td>
                                          {/* 이 식은 ES6표기법 참고 onChange기능도 사용중 */}
            </tr>
       
            );
         } 
    
  }

export default Table;