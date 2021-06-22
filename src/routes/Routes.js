import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../components/Login'
import Home from '../components/Home'
import UserRegister from '../components/UserRegister'
import MovieRegister from '../components/MovieRegister'
import ErrorPage from '../components/ErrorPage'

export default () => {

    return (
        <Switch>
            <Route exact path="/">
                <Home />       
            </Route>

            <Route exact path="/cadastro">
                <MovieRegister />       
            </Route>

            <Route exact path="/usuario/login">
                <Login />
            </Route>            

            <Route exact path="/usuario/cadastrar">
                <UserRegister />  
            </Route>

            <Route path='*' exact={true} component={ErrorPage} /> 

        </Switch>
    );
};