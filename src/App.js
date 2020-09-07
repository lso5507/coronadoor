import React from 'react';
import Login from './Component/Login';
import Main from './Component/Main';
import Join from './Component/Join';
import Header from './Component/Header';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
 


class App extends React.Component {

  constructor(props) {
      super(props);
  }
 
render() {
  return (
      <div className="App">
          <Header></Header>
        	<Router>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/main' component={Main} />
              <Route exact path='/join' component={Join} />
            </Switch>
        </Router>
      </div>
  );
  ;
}
}

export default App;