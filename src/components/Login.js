import axios from 'axios';
import React from 'react'
import '../style/style-form.css'

class Login extends React.Component {    

    handleSubmit = event => {
        event.preventDefault();

        /*axios.post('https//localhost:8082/usuario/login').then(res => {

        })
        .catch(err => {
            alert(err);
        });*/
    }
    
    render() { 
        return (
            <section class="form">
                <div class="form-div">
                    <h1 class="title">Entrar</h1>

                    <form id="login" onSubmit={this.handleSubmit}>
                        <div>
                            <label for="email">E-mail: </label>
                            <input type="text" name="email" id="email" placeholder="E-mail" required=""/><br/><br/>
                        </div>

                        <div>
                            <label for="password">Senha: </label>
                            <input type="password" name="password" id="password" placeholder="Senha" required=""/><br/><br/><br/>
                        </div>

                        <div class="button-submit">
                            <input type="submit" value="Login"/>
                        </div>
                    </form>
                </div>
            </section>            
        );
    }
}
 
export default Login;