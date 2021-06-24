import api from '../services/api'
import React from 'react';
import Modal from '../components/Modal'
import '../style/style-form.css';
import { tmdbApi } from '../services/tmdbApi';

class MovieRegister extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tmdbId: "",
            name: "",
            categories: null,
            releaseDate: null,
            file: null,
            fileName: null,
            show: false,
            title: "",
            message: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);        
    }

    handleSubmit = event => {
        event.preventDefault();

        tmdbApi.get(`/${this.state.tmdbId}?language=pt-BR`).then(res => {

            const movieInfo = res.data;            
            let categories = movieInfo.genres.map((item, i) => item.name);
            let releaseDate = movieInfo.release_date;            

            this.setState({
                categories: categories,
                releaseDate: releaseDate
            });

            const data = new FormData()
            Object.keys(this.state).forEach(key => {
                data.append(key, this.state[key]);
            });

            api.post('filmes/novo', data).then((res) => {
                this.showModal('Salvo!', res.data);
                this.clearForm();
            }).catch((err) => {
                if (err.response)
                    this.showModal('Erro!', err.response.data);
                else
                    this.showModal('Erro!', err);
            });

        }).catch((err) => {
            console.log(err);
            this.showModal('Erro!', 'Erro ao acessar The Movie DataBase (TMDB)!');
        });        
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

    showModal = (title, message) => {
        this.setState({
            show: !this.state.show,
            title: title,
            message: message
        });
    };

    clearForm() {
        this.setState({
            tmdbId: "",
            name: "",
            file: "",
            fileName: "",
            categories: null,
            releaseDate: null
        })
    }

    buildTmdbQuery() {
        const urlBase = "https://www.themoviedb.org/search?";
        let movieName = this.state.name;
        let params = new URLSearchParams();
        params.append('query', movieName)
        return urlBase + params.toString();
    }

    render() {
        document.title = "Cadastro de Filmes";
        return (
            <section className="form">
                <div className="form-div">
                    <Modal onClose={() => this.showModal('', '')} show={this.state.show} title={this.state.title} message={this.state.message}></Modal>
                    <h1 className="title">Cadastrar novo filme</h1>
                    <form id="registerForm" encType="multipart/form-data" onSubmit={this.handleSubmit}>

                        <div>
                            <label htmlFor="name">Nome do Filme: </label>
                            <input type="text" name="name" value={this.state.name} id="movieName" placeholder="Nome do Filme" required={true} onChange={this.handleInputChange} /><br /><br />
                        </div>

                        <div>
                            <label htmlFor="tmdbId">TMDB ID: </label>
                            <input type="number" name="tmdbId" value={this.state.tmdbId} id="tmdbId" placeholder="TMDB ID" required={true} onChange={this.handleInputChange} />
                            <p className="obs">
                                Obs.: Para obter o "TMDB ID" é necessário acessar o site "
                                <u>
                                    <a href={this.buildTmdbQuery()} target="_blank">https://www.themoviedb.org</a>
                                </u>" para pesquisar pelo nome do filme. No link do filme escolhido terá o "id" para cadastro.
                            </p>
                        </div>

                        <div className="input-wrapper">
                            <p>
                                Enviar Imagem: <br /><br />
                                <label htmlFor="input-file">Carregar imagem</label>
                                <input type="file" id="input-file" name="image" onChange={this.handleFile} /><br /><br />
                                <span id="file-name">{this.state.fileName}</span>
                            </p><br />
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