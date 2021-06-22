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
            <section className="form">
                <div className="form-div">
                    <h1 className="title">Entrar</h1>

                    <form id="login" onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="email">E-mail: </label>
                            <input type="text" name="email" id="email" placeholder="E-mail" required=""/><br/><br/>
                        </div>

                        <div>
                            <label htmlFor="password">Senha: </label>
                            <input type="password" name="password" id="password" placeholder="Senha" required=""/><br/><br/><br/>
                        </div>

                        <div className="button-submit">
                            <input type="submit" value="Login"/>
                        </div>
                    </form>
                </div>
            </section>            
        );
    }
}
 
export default Login;