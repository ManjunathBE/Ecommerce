import React from 'react';
import { Route,  Redirect } from 'react-router-dom';
import { useAuth } from "./Auth";

function PrivateRoute({ component: Component, ...rest }) {
    const isAuthenticated = useAuth();
    console.log(isAuthenticated.loginState, 'isauth')

    return (
        <Route {...rest} render={(props) => 
            isAuthenticated.loginState ? (
            <Component {...props} />
        ):(
            <Redirect to="/login" />
        )}
        />
    ); 
}

export default PrivateRoute;