import React from 'react'
import '../style/style-menu.css'
import home from '../icons/home_icon.png';
import registerMovie from '../icons/register_movie_icon.png';
import registerClient from '../icons/register_client_icon.png';
import logoutIcon from '../icons/logout_icon.png';
import loginIcon from '../icons/login_icon.png';
import { isAuthenticated, logout } from '../services/auth';
import { Search } from './Search';
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTag: null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleLogout() {
        logout();
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({
            searchTag: e.target.value
        });
    };

    render() {
        return (
            <header>
                <div className="center" id="menu">
                    <div className="header-left">
                        <div className="menu-header">
                            <ul>
                                <div className="menu-item-left">
                                    <li>
                                        <a href="/">
                                            <img src={home} />
                                            Início
                                        </a>
                                    </li>
                                </div>
                                <div className="menu-item-left">
                                    {isAuthenticated() ?
                                        <li>
                                            <a href="/cadastro">
                                                <img src={registerMovie} />
                                                Cadastrar Filme
                                            </a>
                                        </li> : null}
                                </div>
                                <div className="menu-item-left">                                    
                                        <li>
                                            <a href="/usuario/cadastrar">
                                                <img src={registerClient} />
                                                Cadastrar Usuário
                                            </a>
                                        </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div className="header-right">
                        <Search searchTag={this.state.searchTag} handleChange={this.handleChange} />
                        <div className="menu-header">
                            <ul>
                                <div className="menu-item-right">
                                    {isAuthenticated() ?
                                        <li style={{ marginLeft: 5 }}>
                                            <a href="" onClick={this.handleLogout}>
                                                <img src={logoutIcon} />
                                                Sair
                                            </a>
                                        </li> : null}
                                </div>
                                <div className="menu-item-right">
                                    {!isAuthenticated() ?
                                        <li style={{ marginLeft: 5 }}>
                                            <a href="/usuario/login">
                                                <img src={loginIcon} />
                                                Login</a>
                                        </li> : null}
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;