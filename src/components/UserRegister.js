import { Redirect } from 'react-router-dom'
import axios from 'axios';
import React from 'react';
import '../style/style-form.css'

class UserRegister extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
            name: null,
            email: null,
            password: null,
            password2: null,
            redirect: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }    
    
    handleSubmit(event) {
        event.preventDefault();  
        
        if (!this.validatePassword())
            return;

        alert(JSON.stringify(this.state));

        this.setState({redirect: true});

        /*axios.post('http://localhost:8082/usuario/novo', this.state).then((res) => {
            if (res.status == 200){
                alert("Usuário Criado com Sucesso!");
            }
        })
        .catch((err) => {
            alert(err);
        });*/
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    validatePassword(){
        var password = this.state.password;
        var password2 = this.state.password2;
    
        if (password != password2){
            alert("As senhas não coincidem!");
            return false;
        }
    
        return true;
    }

    render() { 

        const redirect = this.state.redirect;
        if (redirect)
            return <Redirect to="/"/>

        return (                        
            <section className="form">
                <div className="form-div">
                    <h1 className="title">Cadastrar novo Usuário</h1>

                    <form id="registerUser" onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="name">Nome: </label>
                            <input type="text" name="name" id="name" placeholder="Nome do usuário" required={true} onChange={this.handleInputChange}/><br/><br/>
                        </div>
                        
                        <div>
                            <label htmlFor="email">E-mail: </label>
                            <input type="email" name="email" id="email" placeholder="E-mail" required={true} onChange={this.handleInputChange}/><br/><br/>
                        </div>

                        <div>
                            <label htmlFor="password">Senha: </label>
                            <input type="password" name="password" id="password" placeholder="Senha" required={true} onChange={this.handleInputChange}/><br/><br/>
                        </div>

                        <div>
                            <label htmlFor="password2">Repita a Senha: </label>
                            <input type="password" name="password2" id="password2" placeholder="Repita a Senha" required={true} onChange={this.handleInputChange}/><br/><br/><br/>
                        </div>

                        <div className="button-submit">
                            <input type="submit" value="Cadastrar"/>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}
 
export default UserRegister;