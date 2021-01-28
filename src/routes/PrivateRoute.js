import React from 'react';

import { Redirect, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const firebase = useSelector((state) => state.firebase);
  const { auth } = firebase;

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.uid ? <Component {...props} /> : <Redirect to={'/login'} />
      }
    />
  );
};

export default PrivateRoute;
