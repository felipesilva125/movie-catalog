import React from 'react'
import '../style/style-menu.css'
import api from '../services/api'

class Header extends React.Component {       
    
    constructor(props){
        super(props);
        this.state = {
            user: null
        };
    }
    
    componentDidMount() {
        
        api.get('usuario/user').then((res) => {            
            this.setState({user: res.data});
        })
        .catch((error) => {
            alert(error);
        });
    }

    showMovieRegister(){
        return (
            <li><a href="/cadastro">Cadastrar Filme</a></li>
        );
    }

    showUserRegister(){
        return (
            <li><a href="/usuario/cadastrar">Cadastrar Usuário</a></li>
        );
    }

    render() {
        return (      
            <header>
                <div className="center" id="menu">
                    <div className="header-left">
                        <div className="menu-header">
                            <ul>
                                <li><a href="/">Início</a></li>
                                <li><a href="/usuario/login">Login</a></li>
                                {this.showMovieRegister()}
                                {this.showUserRegister()}                                
                            </ul>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="search">
                            <input id="searchName" className="txtSearch" type="text" placeholder="Pesquisar..."/>
                            <img className="btnSearch" src="/search.png"/>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;