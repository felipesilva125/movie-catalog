import React from 'react';

class MovieRegister extends React.Component {    
    render() { 
        return (            
            <section class="form">
                <div class="form-div">
                    <h1 class="title">Cadastrar novo filme</h1>
                    <form id="registerForm" action="/novo-filme" method="POST" enctype="multipart/form-data">
                        <div>
                            <label for="name">Nome do Filme: </label>
                            <input type="text" name="name" id="movieName" placeholder="Nome do Filme" required={true}/><br/><br/>
                        </div>

                        <div>
                            <label for="category">Categoria: </label>
                            <input type="text" name="category" id="category" placeholder="Categoria" required={true}/><br/><br/>
                        </div>

                        <div>
                            <label for="releaseDate">Lançamento: </label>
                            <input type="month" name="releaseDate" id="releaseDate" required={true} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/><br/><br/>
                        </div>

                        <div>
                            <label for="producer">Produtora: </label>
                            <input type="text" name="producer" id="producer" placeholder="Produtora" required={true}/><br/><br/>
                        </div>

                        <div>
                            <label for="director">Diretor: </label>
                            <input type="text" name="director" id="director" placeholder="Diretor" required={true}/><br/><br/>
                        </div>

                        <div>
                            <label for="cast">Elenco: </label>
                            <input type="text" name="cast" id="cast" placeholder="Elenco" required={true}/><br/><br/>
                        </div>

                        <div>
                            <label for="duration">Duração (minutos): </label>
                            <input type="number" name="duration" id="duration" placeholder="Duração" required={true}/><br/><br/>
                        </div>

                        <div>
                            <label for="trailer">Link Trailer: </label>
                            <input type="text" name="trailer" id="trailer" placeholder="Link Trailler" required={true}/><br/><br/>
                        </div>

                        <div class="input-wrapper">
                            <p>
                                Enviar Imagem: <br/><br/>
                                <label for="input-file">Carregar imagem</label>
                                <input type="file" id="input-file" name="image" value="" onchange="getFileName()" required={true}/><br/><br/>
                                <span id="file-name"></span>
                            </p><br/>
                        </div>                

                        <div>
                            <label for="synopsis">Sinopse: </label>
                            <textarea name="synopsis" class="text" id="synopsis" required={true} rows="15" placeholder="Sinopse..."></textarea><br/><br/>
                        </div>

                        <div class="button-submit">
                            <input type="submit" value="Cadastrar"/>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}
 
export default MovieRegister;