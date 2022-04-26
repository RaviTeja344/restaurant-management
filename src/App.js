import React from 'react';
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';
 
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          {/* <div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
          </div> */}
          <div className="content">
            <Switch>
              <Redirect exact path="/" to="signup" />
              <Route path="/login" component={Login} />
              <Route path="/home" component={Home} />
              <Route path="/signup" component={Signup}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
 
export default App;