import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Writing from './pages/Writing';
import SignUp from './pages/SignUp';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/writing' component={Writing} />
        <Route exact path='/signup' component={SignUp} />
        <Route render = { function() {
          return <h1>Not Found</h1>;
        }} />
      </Switch>
    );
  }
}

export default Routes;
