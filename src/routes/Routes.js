import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import Login from '../components/Login'
import Home from '../components/Home'
import UserRegister from '../components/UserRegister'
import MovieRegister from '../components/MovieRegister'
import ErrorPage from '../components/ErrorPage'
import MoviePage from '../components/MoviePage'
import { AuthenticatedRoute, UnauthenticatedRoute } from './PrivateRoute'

const Routes = () => (
    <BrowserRouter>        
        <Switch>
            <Route exact path="/" component={Home}/>                   
            <AuthenticatedRoute exact path="/cadastro" component={MovieRegister} />
            <UnauthenticatedRoute exact path="/usuario/login" component={Login}/>                    
            <AuthenticatedRoute exact path="/usuario/cadastrar" component={UserRegister}/>
            <Route exact path="/filme/detalhes/:id" component={MoviePage}/>                                        
            <Route path='*' exact={true} component={ErrorPage}/>
        </Switch>    
    </BrowserRouter>
);    

export default Routes;
