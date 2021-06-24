import api from '../services/api';
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

        api.post('usuario/novo', this.state).then((res) => {
            alert(res.data);            
            this.props.history.push("/");
        })
        .catch((err) => {
            alert(err.response.data);
        });
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