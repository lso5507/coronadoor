import React,{Redirect, useState} from 'react';
import Login from './Component/Login';
import Main from './Component/Main';
import Join from './Component/Join';
import Update from './Component/Update';
import Delete from './Component/Delete';
import Header from './Component/Header';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'



class App extends React.Component {

  constructor(props) {
      super(props);
      this.state={
        com:Login
      }
      if(window.sessionStorage.id){
        this.state.com=Main
      }

  }
 
render() {
  return (
      <div className="App">
          
        	<Router>
          <Route exact path='*' component={Header} />
            <Switch>
              <Route exact path='/' component={Login} />
              
              <Route exact path='/main' component={this.state.com}></Route>
            

              <Route exact path='/join' component={Join} />
              <Route exact path='/update' component={Update} />
              <Route exact path='/delete' component={Delete} />
            </Switch>
        </Router>
      </div>
  );
  ;
}
}

export default App;