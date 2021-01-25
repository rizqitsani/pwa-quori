import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  Categories,
  Home,
  Login,
  MyThreads,
  Register,
  ThreadDetails,
} from '../pages';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/mythreads' component={MyThreads} />
        <Route exact path='/categories/:name' component={Categories} />
        <Route exact path='/thread/:id' component={ThreadDetails} />
      </Switch>
    </Router>
  );
};

export default Routes;
