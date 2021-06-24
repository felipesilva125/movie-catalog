import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

export const AuthenticatedRoute = ( {component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...rest} /> 
        ) : (
            <Redirect to={{ pathname: "/usuario/login", state: {from: props.location}}} /> 
        )
    )} />
);

export const UnauthenticatedRoute = ( {component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !isAuthenticated() ? (
            <Component {...rest} /> 
        ) : (
            <Redirect to={{ pathname: "/", state: {from: props.location}}} /> 
        )
    )} />
);