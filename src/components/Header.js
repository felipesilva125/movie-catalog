import React from 'react'
import '../style/style-menu.css'

function Header() {
    return (      
      <header>
            <div className="center" id="menu">
                <div className="header-left">
                    <div className="menu-header">
                        <ul>
                            <li><a href="/">Início</a></li>
                            <li><a href="/usuario/login">Login</a></li>
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

export default Header;