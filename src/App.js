import React from 'react';
import Login from './Component/Login';
import Main from './Component/Main';


 


class App extends React.Component {

  constructor(props) {
      super(props);
  }
 
render() {
  return (
      <div className="App">
        <Main></Main>  {/*Main태그 활성화 */}
      </div>
  );
  ;
}
}

export default App;