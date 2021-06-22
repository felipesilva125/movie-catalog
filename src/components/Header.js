import React from 'react'
import '../style/style-menu.css'
import axios from 'axios'

class Header extends React.Component {       
    
    constructor(props){
        super(props);
        this.state = {
            user: null
        };
    }
    
    componentDidMount() {
        
        axios.get('http://localhost:8082/usuario/user').then((res) => {            
            this.setState({user: res.data});
        })
        .catch((error) => {
            alert(error);
        });
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
                                <li><a href="/cadastro">Cadastrar Filme</a></li>
                                <li><a href="/usuario/cadastrar">Cadastrar Usuário</a></li>
                                <li>{this.state.user ? "abc" : null}</li>
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