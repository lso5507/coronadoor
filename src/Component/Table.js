import React, { useState } from 'react';


const useInput = initialValue=>{
  const [value,setValue] = useState(initialValue);
  

  const onSave = (id)=>{
    const check = window.confirm( '저장하시겠습니까?');
    if(check){
      const element ={
        id:id,
        element:value
      }
      console.log(element)
    }
    else{
      alert("저장하지 않습니다.");
    }
    
  }
  const onChange = e=>{
    setValue(e.target.value);
    e.target.innerHTML=e.target.value;
  }

  return{value,onChange,onSave};
}
 
function Table({id,time,temp,memo}){
      const useMemo = useInput(memo);
      const useSave = useInput(); 
      return (

          <tr  className="ContentData" >
            <td style={{display:"none"}}>{id}</td>  
            <td style={{width:"10vw"}}>{time}</td>
            <td style={{width:"10vw"}}>{temp}</td>
            <input  className="memoData" {...useMemo} placeholder="memo" style={{width:"40vw"}}></input>
            
          </tr>

      );
    
  }

export default Table;