import React from 'react';
import Login from './Component/Login';
import Main from './Component/Main';


 


class App extends React.Component {

  constructor(props) {
      super(props);
      
    
    
      this.state = {
        status:null,
        data:null
      };

      
  }
  fetchload = () =>{
    console.log(this.state.data)
    fetch('http://localhost:3002/api')
      .then(res => res.json())
      .then(data => {
        this.setState({status: data.status,data:data.xdatas})
        console.log(data.datas)
      });  
  }

  componentDidMount() {
    this.fetchload()
    this.timer = setInterval(() => this.fetchload(), 3000);
  }
  componentWillMount(){
    this.timer=null;
  }
render() {
  const {status,data} = this.state;
  
  
 
        
  return (
      <div className="App">
        <h1 >{status}    {data}</h1>
        <Main></Main>
      </div>
  );
  ;
}
}

export default App;