import React from 'react';
import Login from './Component/Login';
import Main from './Component/Main';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
 


class App extends React.Component {

  constructor(props) {
      super(props);
  }
 
render() {
  return (
      <div className="App">
        	<Router>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/main' component={Main} />
            </Switch>
        </Router>
      </div>
  );
  ;
}
}

export default App;