import api from '../services/api'
import React from 'react';
import Modal from '../components/Modal'
import '../style/style-form.css';

class MovieRegister extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            category: null,
            releaseDate: null,
            producer: null,
            director: null,
            cast: null,
            duration: null,
            trailer: null,
            synopsis: null,
            file: null,
            fileName: null,
            show: false,
            title: null,
            message: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        event.preventDefault();

        const data = new FormData()
        Object.keys(this.state).forEach(key => {
            data.append(key, this.state[key]);
        });

        api.post('filmes/novo', data).then((res) => {
            this.showModal(event, 'Salvo!', res.data);
            this.clearForm();
        })
            .catch((err) => {
                if (err.response)
                    this.showModal(event, 'Erro!', err.response.data);
                else
                    this.showModal(event, 'Erro!', err);
            })
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleFile = event => {

        if (!this.validateImageType(event))
            return;

        const file = event.target.files[0];
        const fileName = file.name;

        this.setState({
            file: file,
            fileName: fileName
        });
    }

    validateImageType = event => {
        let file = event.target.files[0];
        const types = ['image/png', 'image/jpeg', 'image/gif'];

        if (types.every(type => file.type !== type)) {
            this.showModal(event, 'Erro!', `O formato ${file.type} não é um formato de imagem válido.`);
            event.target.value = null;
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
            category: "",
            releaseDate: "",
            producer: "",
            director: "",
            cast: "",
            duration: "",
            trailer: "",
            synopsis: "",
            file: "",
            fileName: ""
        })
    }

    render() {
        return (
            <section className="form">
                <div className="form-div">
                    <Modal onClose={e => this.showModal(e, '', '')} show={this.state.show} title={this.state.title} message={this.state.message}></Modal>
                    <h1 className="title">Cadastrar novo filme</h1>
                    <form id="registerForm" encType="multipart/form-data" onSubmit={this.handleSubmit}>

                        <div>
                            <label htmlFor="name">Nome do Filme: </label>
                            <input type="text" name="name" value={this.state.name} id="movieName" placeholder="Nome do Filme" required={true} onChange={this.handleInputChange} /><br /><br />
                        </div>

                        <div>
                            <label htmlFor="category">Categoria: </label>
                            <input type="text" name="category" value={this.state.category} id="category" placeholder="Categoria" required={true} onChange={this.handleInputChange} /><br /><br />
                        </div>

                        <div>
                            <label htmlFor="releaseDate">Lançamento: </label>
                            <input type="month" name="releaseDate" value={this.state.releaseDate} id="releaseDate" required={true} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" onChange={this.handleInputChange} /><br /><br />
                        </div>

                        <div>
                            <label htmlFor="producer">Produtora: </label>
                            <input type="text" name="producer" value={this.state.producer} id="producer" placeholder="Produtora" required={true} onChange={this.handleInputChange} /><br /><br />
                        </div>

                        <div>
                            <label htmlFor="director">Diretor: </label>
                            <input type="text" name="director" value={this.state.director} id="director" placeholder="Diretor" required={true} onChange={this.handleInputChange} /><br /><br />
                        </div>

                        <div>
                            <label htmlFor="cast">Elenco: </label>
                            <input type="text" name="cast" value={this.state.cast} id="cast" placeholder="Elenco" required={true} onChange={this.handleInputChange} /><br /><br />
                        </div>

                        <div>
                            <label htmlFor="duration">Duração (minutos): </label>
                            <input type="number" name="duration" value={this.state.duration} id="duration" placeholder="Duração" required={true} onChange={this.handleInputChange} /><br /><br />
                        </div>

                        <div>
                            <label htmlFor="trailer">Link Trailer: </label>
                            <input type="text" name="trailer" value={this.state.trailer} id="trailer" placeholder="Link Trailler" required={true} onChange={this.handleInputChange} /><br /><br />
                        </div>

                        <div className="input-wrapper">
                            <p>
                                Enviar Imagem: <br /><br />
                                <label htmlFor="input-file">Carregar imagem</label>
                                <input type="file" id="input-file" name="image" onChange={this.handleFile} /><br /><br />
                                <span id="file-name">{this.state.fileName}</span>
                            </p><br />
                        </div>

                        <div>
                            <label htmlFor="synopsis">Sinopse: </label>
                            <textarea name="synopsis" className="text" value={this.state.synopsis} id="synopsis" required={true} rows="15" placeholder="Sinopse..." onChange={this.handleInputChange}>
                            </textarea><br /><br />
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

export default MovieRegister;