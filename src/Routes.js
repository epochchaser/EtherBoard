import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import SignUpPage from './components/signup/SignUpPage';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/signup' component={SignUpPage} />
        <Route render = { function() {
          return <h1>Not Found</h1>;
        }} />
      </Switch>
    );
  }
}

export default Routes;
