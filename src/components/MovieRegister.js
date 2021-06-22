import React from 'react'; 

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
            image: null,
            synopsis: null,
            fileName: null            
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    handleSubmit (event) {
        event.preventDefault();
        alert(JSON.stringify(this.state));
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleFile(event) {
        const filePath = event.target.value;
        const fileName = filePath.replace(/^.*[\\\/]/, '');        

        this.setState({
            image: filePath,
            fileName: fileName
        });
    }

    render() { 
        return (            
            <section className="form">
                <div className="form-div">
                    <h1 className="title">Cadastrar novo filme</h1>
                    <form id="registerForm" action="/novo-filme" method="POST" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="name">Nome do Filme: </label>
                            <input type="text" name="name" id="movieName" placeholder="Nome do Filme" required={true} onChange={this.handleInputChange}/><br/><br/>
                        </div>

                        <div>
                            <label htmlFor="category">Categoria: </label>
                            <input type="text" name="category" id="category" placeholder="Categoria" required={true} onChange={this.handleInputChange}/><br/><br/>
                        </div>

                        <div>
                            <label htmlFor="releaseDate">Lançamento: </label>
                            <input type="month" name="releaseDate" id="releaseDate" required={true} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" onChange={this.handleInputChange}/><br/><br/>
                        </div>

                        <div>
                            <label htmlFor="producer">Produtora: </label>
                            <input type="text" name="producer" id="producer" placeholder="Produtora" required={true} onChange={this.handleInputChange}/><br/><br/>
                        </div>

                        <div>
                            <label htmlFor="director">Diretor: </label>
                            <input type="text" name="director" id="director" placeholder="Diretor" required={true} onChange={this.handleInputChange}/><br/><br/>
                        </div>

                        <div>
                            <label htmlFor="cast">Elenco: </label>
                            <input type="text" name="cast" id="cast" placeholder="Elenco" required={true} onChange={this.handleInputChange}/><br/><br/>
                        </div>

                        <div>
                            <label htmlFor="duration">Duração (minutos): </label>
                            <input type="number" name="duration" id="duration" placeholder="Duração" required={true} onChange={this.handleInputChange}/><br/><br/>
                        </div>

                        <div>
                            <label htmlFor="trailer">Link Trailer: </label>
                            <input type="text" name="trailer" id="trailer" placeholder="Link Trailler" required={true} onChange={this.handleInputChange}/><br/><br/>
                        </div>

                        <div className="input-wrapper">
                            <p>
                                Enviar Imagem: <br/><br/>
                                <label htmlFor="input-file">Carregar imagem</label>
                                <input type="file" id="input-file" name="image" required={true} onChange={this.handleFile}/><br/><br/>
                                <span id="file-name">{this.state.fileName}</span>
                            </p><br/>
                        </div>                

                        <div>
                            <label htmlFor="synopsis">Sinopse: </label>
                            <textarea name="synopsis" className="text" id="synopsis" required={true} rows="15" placeholder="Sinopse..." onChange={this.handleInputChange}>                                
                            </textarea><br/><br/>
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
 
export default MovieRegister;