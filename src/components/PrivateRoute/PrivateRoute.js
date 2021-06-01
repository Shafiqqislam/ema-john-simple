import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../App';

const PrivateRoute = ({children,...rest}) => {
    const [loogedInUser,setLoogedInUser]=useContext(UserContext);
    return (
        <Route
        {...rest}
        render={({ location }) =>
         ( loogedInUser.email || sessionStorage.getItem('token')) ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivateRoute;