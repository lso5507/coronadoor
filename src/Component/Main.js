import React,{useEffect,useState} from 'react';
import "../resources/Main.css"
import Table from "./Table";
import '../resources/Table.css';
  // componentDidMount, componentDidUpdate와 같은 방식으로

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
       
            
            fetch('http://localhost:3002/api/check',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body:JSON.stringify({data:"1"})
            })
            setLock("OPEN...")
            setTimeout(()=>setLock("LOCK"),2000)
            
        

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

function Main(){
    const lock = useInput("LOCK");
    
    const [tempData,setTempData] = useState([{time:"00:00:00", temp: '37.4', memo: ''},{time:"00:00:00", temp: '37.7', memo: ''}])  // 전달받은 온도 값을 저장하기 위한 변수 
    const data_save = useInput(tempData)
    useEffect(() => {
    
        

        const timer = setInterval(() =>{
            fetch('http://localhost:3002/api/check')
            .then(res => {
                
                return res.json()
            })
            .then(data => {   
                /*---------------------data가 100개가 넘어가면 자동저장후 초기화----------------- */
                if(parseFloat(tempData)>1){
                    data_save.dataSave(tempData)
                    setTempData([{time:"00:00:00", temp: '37.4', memo: ''}])
                    setTempData(data)
                }
                else{
                    setTempData(data)
                }
                /*---------------------data가 100개가 넘어가면 자동저장----------------- */
            });  

            
        }, 3000);  // 3초마다 온도 값 새로고침
        
        
        },[]);  

    
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
                            <th><button onClick={data_save.dataSave}>SAVE</button>  {/*클릭시 data_save 객체안에 dataSave 요청 */}</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                 
                 tempData.map(data=>(     // map을 이용하여 데이터들을 Tabel 서식에 맞게 뿌려줌
                         
                            <Table  time={data.time} temp={data.temp+"°C"} memo={data.memo}/>    
                    ))
                    }
                    </tbody>
                </table>
                
                
                </div>
            </div>
      
            <div className="skil">
                
              <div className="division">
                  <h1>Door : {lock.lock}</h1>  {/* 현재 문 상태 표시 */}
                <input type="button" value={lock.lock} onClick={lock.lockOnClick}></input>  {/*클릭시 lock 객체안에 lockOnClick 요청 */}
              </div>
            </div>


        </div>

    );

}
export default Main;