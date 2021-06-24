import api from '../services/api';
import React from 'react';
import Modal from '../components/Modal';
import '../style/style-form.css'

class UserRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            password: null,
            password2: null,
            redirect: false,
            show: false,
            title: null,
            message: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.validatePassword())
            return;

        api.post('usuario/novo', this.state).then((res) => {
            this.showModal(event, "Salvo.", res.data);
            this.clearForm();
        }).catch((err) => {
            if (err.response)
                this.showModal(event, "Erro!", err.response.data);
            else
                this.showModal(event, "Erro!", err);
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

    validatePassword(event) {
        var password = this.state.password;
        var password2 = this.state.password2;

        if (password != password2) {
            this.showModal(event, "Erro!", "As senhas não coincidem!");
            return false;
        }

        return true;
    }

    showModal = (e, title, message) => {
        this.setState({
            show: !this.state.show,
            title: title,
            message: message
        });
    };

    clearForm() {
        this.setState({
            name: "",
            email: "",
            password: "",
            password2: ""
        })
    }

    render() {

        return (
            <section className="form">
                <div className="form-div">
                    <Modal onClose={e => this.showModal(e, '', '')} show={this.state.show} title={this.state.title} message={this.state.message}></Modal>
                    <h1 className="title">Cadastrar novo Usuário</h1>

                    <form id="registerUser" onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="name">Nome: </label>
                            <input type="text" name="name" value={this.state.name} id="name" placeholder="Nome do usuário" required={true} onChange={this.handleInputChange} /><br /><br />
                        </div>

                        <div>
                            <label htmlFor="email">E-mail: </label>
                            <input type="email" name="email" value={this.state.email} id="email" placeholder="E-mail" required={true} onChange={this.handleInputChange} /><br /><br />
                        </div>

                        <div>
                            <label htmlFor="password">Senha: </label>
                            <input type="password" name="password" value={this.state.password} id="password" placeholder="Senha" required={true} onChange={this.handleInputChange} /><br /><br />
                        </div>

                        <div>
                            <label htmlFor="password2">Confirme a Senha: </label>
                            <input type="password" name="password2" value={this.state.password2} id="password2" placeholder="Confirme a Senha" required={true} onChange={this.handleInputChange} /><br /><br /><br />
                        </div>

                        <div className="button-submit">
                            <input type="submit" value="Cadastrar" />
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default UserRegister;