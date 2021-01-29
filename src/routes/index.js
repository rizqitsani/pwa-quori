import React from 'react';

import { Flex, Spinner, useColorModeValue } from '@chakra-ui/react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

import {
  Categories,
  EditProfile,
  Home,
  Login,
  MyThreads,
  Register,
  ThreadDetails,
} from '../pages';

import PrivateRoute from './PrivateRoute';

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth);

  const spinnerColor = useColorModeValue('orange.500', 'orange.200');

  return isLoaded(auth) ? (
    children
  ) : (
    <Flex minH='100vh' justify='center' align='center'>
      <Spinner thickness='4px' color={spinnerColor} size='xl' />
    </Flex>
  );
};

const Routes = () => {
  return (
    <Router>
      <AuthIsLoaded>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path='/mythreads' component={MyThreads} />
          <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          <Route exact path='/categories/:name' component={Categories} />
          <PrivateRoute exact path='/thread/:id' component={ThreadDetails} />
        </Switch>
      </AuthIsLoaded>
    </Router>
  );
};

export default Routes;
