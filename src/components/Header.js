import React from 'react'
import '../style/style-menu.css'
import api from '../services/api'
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
                                <li><a href="/">Início</a></li>                                
                                {isAuthenticated() ? <li><a href="/cadastro">Cadastrar Filme</a></li> : null}
                                {isAuthenticated() ? <li><a href="/usuario/cadastrar">Cadastrar Usuário</a></li> : null}
                            </ul>
                        </div>
                    </div>
                    <div className="header-right">
                        <Search searchTag={this.state.searchTag} handleChange={this.handleChange}/>                        
                        <div className="menu-header">
                            <ul>
                                {isAuthenticated() ? <li style={{marginLeft: 5}}><a href="" onClick={this.handleLogout}>Sair</a></li> : null}
                                {!isAuthenticated() ? <li style={{marginLeft: 0}}><a href="/usuario/login">Login</a></li> : null}
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;