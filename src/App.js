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
        main:Login,
        update:Login,
        
      }
      if(window.sessionStorage.id){
        this.state.main=Main
        this.state.update=Update
        
        
      }

  }
 
render() {
  return (
      <div className="App">
          
        	<Router>
          <Route exact path='*' component={Header} />
            <Switch>
              <Route exact path='/' component={Login} />
              
              <Route exact path='/main' component={this.state.main}></Route>
            

              <Route exact path='/join' component={Join} />
              <Route exact path='/update' component={this.state.update} />
              
            </Switch>
        </Router>
      </div>
  );
  ;
}
}

export default App;