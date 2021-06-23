import React from 'react';
import api from '../services/api';
import '../style/style-movie.css'

class MoviePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            movie: null
        };
    }

    componentDidMount() {

        const id = this.props.match.params.id;
        api.get(`filmes/detalhes/${id}`).then((res) => {            
            this.setState({
                movie: res.data
            });
        })
        .catch((err) => {

        });
    }

    rateMovie(i){

    }

    getVideoUrl(){
        let videoUrl = this.state.movie?.Trailer;
        let videoId = videoUrl?.substring(videoUrl.indexOf('/embed/') + 7, videoUrl.length);
        return videoUrl + `?autoplay=1&mute=1&playlist=${videoId}&loop=1&controls=0"`;
    }
        
    render() {        
        const movie = this.state.movie;
        return (              
            <section className="movie-info" id="main-section">
                <h1 style={{textAlign: 'center', fontSize: 3+'em'}}>{movie?.Name}</h1>
                <div className="main-info">
                    <div className="movie-picture">
                    <img src={process.env.PUBLIC_URL+'/'+movie?.ImagePath} itemProp="image" alt="Velozes e Furiosos 6"/>                
                    </div>
                    <div className="movie-content">
                        <h2>Ano de Estréia:</h2>
                        <p>{new Date(movie?.ReleaseDate).getFullYear()}</p>
                        <h2>Categoria:</h2>
                        <p>{movie?.Category}</p>
                        <h2>Produtora:</h2>
                        <p>{movie?.Producer}</p>
                        <h2>Diretor:</h2>
                        <p>{movie?.Director}</p>
                    </div>
                    <div className="movie-content">
                        <h2>Elenco:</h2>
                            {movie?.Cast.slice(0, 10).map((item, i) => <p>{item}</p>)}
                    </div>
                </div>
                <div className="main-info">
                    <div className="synopsis">
                        <h2>Sinopse:</h2>
                        <p>{movie?.Synopsis}</p>
                    </div>
                    <div className="rating">
                        <h2>Média:</h2>
                        <div className="medium-rating-movie">
                            <h1 id="medium-rating-movie" style={{fontSize: 3+'em', textAlign: 'center'}}>{movie?.MediumRating}</h1>
                            <img src={process.env.PUBLIC_URL+"/star1.png"}/>
                        </div>
                    </div>
                    <div className="rating">
                        <h2>Avaliar:</h2>
                        <div className="rate-movie">
                            <img src={process.env.PUBLIC_URL+"/star1.png"} onClick={this.rateMovie(1)}/>
                            <img src={process.env.PUBLIC_URL+"/star1.png"} onClick={this.rateMovie(2)}/>
                            <img src={process.env.PUBLIC_URL+"/star1.png"} onClick={this.rateMovie(3)}/>
                            <img src={process.env.PUBLIC_URL+"/star1.png"} onClick={this.rateMovie(4)}/>
                            <img src={process.env.PUBLIC_URL+"/star1.png"} onClick={this.rateMovie(5)}/>                    
                        </div>
                    </div>
                </div>
                <div className="trailer">
                    <iframe className="movie-trailer" src={this.getVideoUrl()} allowfullscreen="" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
            </section>
        );
    }
}
 
export default MoviePage;