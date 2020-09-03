import React,{useEffect,useState,useMemo} from 'react';
import "../resources/Main.css"
import Table from "./Table";
import '../resources/Table.css';
  // componentDidMount, componentDidUpdate와 같은 방식으로

  var modelData = [  //아두이노에서 전달받을 Data값 임시 지정 //    {time:"23:00:00", temp: '37.8', memo: ''},
  {time:"23:00:00", temp: '37.8', memo: ''}

];
function saveToFile_Chrome(fileName, content) { //텍스트파일 저장 로직
    var blob = new Blob([content], { type: 'text/plain' });
    let objURL = window.URL.createObjectURL(blob);
            
    // 이전에 생성된 메모리 해제
    if (window.__Xr_objURL_forCreatingFile__) {
        window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
    }
    window.__Xr_objURL_forCreatingFile__ = objURL;
    var a = document.createElement('a');
    a.download = fileName;
    a.href = objURL;
    
    a.click();
}
const useInput=initialValue  =>{
    const [lock,setLock] = useState(initialValue);
    
    const lockOnClick= e=>{ ///////////////////////////////////문 On/Off 이벤트
        if(e.target.value ==="ON"){
            setLock("OFF");
        }
        else if(e.target.value==="OFF"){
            setLock("ON");
        }
        else {
            alert("Value ERROR");
            
        }
    };

    const dataSave = data=>{
        if(!data){
            alert("No Data!")
        }
        else{
            const datas = document.getElementsByClassName("ContentData")
            let text = "time\t\t temp\t memo \n"; // Log파일 초기값 
            
            
            for (const i in datas) {
                if(datas[i].innerText){
                    text+=datas[i].innerText+document.getElementsByClassName("memoData")[i].textContent+"\n"; //온도값 TIme값과 memo value 합치기
                }
                
              }
              
            const date =  new Date();
            console.log(date.getDay())
            const fileName = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()  // 현재 날짜 구하기
            saveToFile_Chrome(fileName,text)

            

        }
        

    }
    

    return {lock,lockOnClick,dataSave};
};

const fetchload = () =>{
    
    fetch('http://localhost:3002/api')
      .then(res => res.json())
      .then(data => {
        
        console.log(modelData)
        modelData=data
        
      });  
      
  }
const getData = (data) =>{
    modelData=data
}
function Main(){
    
    useEffect(() => {
        const timer = setInterval(() => fetchload(), 3000);
        },[]);
    
    const lock = useInput("ON");
    const data_save = useInput(modelData)
    return(
        <div className="content">
            <div className="state">
                <div className="division">
                <table className="fixed_headers">
                    <thead>
                        <tr>
                            <th>time</th>
                            <th>temp</th>
                            <th>memo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    memo.map(data=>(
                            <Table  time={data.time} temp={data.temp+"°C"} memo={data.memo}/>    
                    ))}
                    </tbody>
                </table>
                
                <button onClick={data_save.dataSave}>SAVE</button>
                </div>
            </div>
      
            <div className="skil">
                
              <div className="division">
                  <h1>Door : {lock.lock}</h1>
                <input type="button" value={lock.lock} onClick={lock.lockOnClick}></input>
              </div>
            </div>


        </div>

    );

}
export default Main;