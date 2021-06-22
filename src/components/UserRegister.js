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
            password2: null            
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }    
    
    handleSubmit(event) {
        event.preventDefault();        
        alert(JSON.stringify(this.state));

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

    render() { 
        return (  
            <section className="form">
                <div className="form-div">
                    <h1 className="title">Cadastrar novo Usuário</h1>

                    <form id="registerUser" onSubmit={this.handleSubmit}>
                        <div>
                            <label for="name">Nome: </label>
                            <input type="text" name="name" id="name" placeholder="Nome do usuário" required={true} onChange={this.handleInputChange}/><br/><br/>
                        </div>
                        
                        <div>
                            <label for="email">E-mail: </label>
                            <input type="email" name="email" id="email" placeholder="E-mail" required={true} onChange={this.handleInputChange}/><br/><br/>
                        </div>

                        <div>
                            <label for="password">Senha: </label>
                            <input type="password" name="password" id="password" placeholder="Senha" required={true} onChange={this.handleInputChange}/><br/><br/>
                        </div>

                        <div>
                            <label for="password2">Repita a Senha: </label>
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