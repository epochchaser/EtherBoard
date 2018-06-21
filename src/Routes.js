import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Writing from './pages/Writing';
import Profile from './pages/Profile';
import FullPost from './pages/FullPost';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/writing' component={Writing} />
        <Route exact path='/profile' component={Profile}/>
        <Route path='/post/:id' component={FullPost}/>
        <Route render = { function() {
          return <h1>Not Found</h1>;
        }} />
      </Switch>
    );
  }
}

export default Routes;
