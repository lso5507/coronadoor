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