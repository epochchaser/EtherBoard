import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Writing from './pages/Writing';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/writing' component={Writing} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/profile' component={Profile} />
        <Route render = { function() {
          return <h1>Not Found</h1>;
        }} />
      </Switch>
    );
  }
}

export default Routes;
