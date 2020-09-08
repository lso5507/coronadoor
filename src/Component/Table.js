import React, { useState } from 'react';


const useInput = initialValue=>{
  const [value,setValue] = useState(initialValue);
  


  const onChange = e=>{
    setValue(e.target.value);
    e.target.innerHTML=e.target.value;
  }

  return{value,onChange};
}
 
function Table({id,time,temp,memo}){
      const memoDatas = useInput(memo);   // useInput으로 연결
      
      return (
        <table>
          <tr  className="ContentData" >
            <td style={{display:"none"}}>{id}</td>  
            <td style={{width:"10vw"}}>{time}</td>
            <td style={{width:"10vw"}}>{temp}</td>
            <input  className="memoData" {...memoDatas} placeholder="memo" style={{width:"40vw"}}></input>
                                        {/* 이 식은 ES6표기법 참고 onChange기능도 사용중 */}
          </tr>
          </table>
      );
    
  }

export default Table;