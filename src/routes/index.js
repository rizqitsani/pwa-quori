import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Categories, Home, Login, Register, Threads } from '../pages';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/threads' component={Threads} />
        <Route exact path='/categories/:name' component={Categories} />
      </Switch>
    </Router>
  );
};

export default Routes;
