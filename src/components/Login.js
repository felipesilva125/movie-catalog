import React from 'react'
import Modal from '../components/Modal'
import api from '../services/api';
import { login } from '../services/auth';
import '../style/style-form.css'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            show: false,
            title: null,
            message: null
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleLogin = event => {
        event.preventDefault();

        api.post('usuario/login', this.state).then(res => {
            login(res.data.token);
            window.location.reload();
        })
            .catch((err) => {
                if (err.response)
                    this.showModal(event, 'Erro!', err.response.data);
                else
                    this.showModal(event, 'Erro!', err);
            })
    }

    onChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    showModal = (e, title, message) => {
        this.setState({
            show: !this.state.show,
            title: title,
            message: message
        });
    };

    render() {
        document.title = "Login";
        return (
            <section className="form">
                <div className="form-div">
                    <Modal onClose={e => this.showModal(e, '', '')} show={this.state.show} title={this.state.title} message={this.state.message}></Modal>
                    <h1 className="title">Entrar</h1>

                    <form id="login" onSubmit={this.handleLogin}>
                        <div>
                            <label htmlFor="email">E-mail: </label>
                            <input type="email" name="email" id="email" placeholder="E-mail" required onChange={this.onChange} value={this.state.email} /><br /><br />
                        </div>

                        <div>
                            <label htmlFor="password">Senha: </label>
                            <input type="password" name="password" id="password" placeholder="Senha" required onChange={this.onChange} value={this.state.password} /><br /><br /><br />
                        </div>

                        <div className="button-submit">
                            <input type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default Login;