import React from 'react';
import api from '../services/api';
import { tmdbApi } from '../services/tmdbApi';
import '../style/style-movie.css'

class MoviePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            movie: null
        };
    }

    componentWillMount() {

        const id = this.props.match.params.id;
        
        if (!id)
            return;

        api.get(`filmes/detalhes/${id}`).then(res => {            
            let movie = res.data;
            /*this.setState({
                movie: res.data
            });*/

            /*tmdbApi.get('/337404').then((response) => {
                console.log(response.data);
            })
            .catch((error) => {

            });*/
            //tmdbApi.get('/337404/credits')

            Promise.all([
                tmdbApi.get('/337404'),
                tmdbApi.get('/337404/credits')
            ]).then(([a,b]) => {
                const movieInfo = a.data;
                const credits = b.data;
                this.setMovieInfo(movie, movieInfo);
                this.setCredits(movie, credits);
                console.log(movieInfo);
                console.log(credits);
                console.log(movie);

                this.setState({
                    movie: movie
                });
            }).catch(err => {
                alert(err);
            })
        })
        .catch(err => {

        });
    }

    setCredits(movie, credits){
        movie.Cast = credits.cast.map((item, i) => item.name);
    }

    setMovieInfo(movie, movieInfo){
        

    }

    rateMovie(value){        
        const data = {
            id: this.state.movie._id,
            rating: value
        }

        api.post('filmes/avaliar', data).then((res) => {
            localStorage.setItem('rating', value);            
            window.location.reload()
        })
        .catch((err) => {

        });
    }

    getVideoUrl(){
        let videoUrl = this.state.movie?.Trailer;
        let videoId = videoUrl?.substring(videoUrl.indexOf('/embed/') + 7, videoUrl.length);
        return videoUrl + `?autoplay=1&mute=1&playlist=${videoId}&loop=1&controls=0"`;
    }  

    buildRating(){
        let itemList=[];
        let rating = localStorage.getItem('rating');        

        for (let i = 1; i <= 5; i++){
            let image = "/star0.png";

            if (rating && rating >= i){                
                image = '/star1.png';
            }

            itemList.push(<img key={i} src={process.env.PUBLIC_URL+image} onClick={() => this.rateMovie(i)}/>)
        }        

        return itemList;
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
                        <p>{movie ? new Date(movie.ReleaseDate)?.getFullYear() : null}</p>
                        <h2>Categoria:</h2>
                        <p>{movie?.Category}</p>
                        <h2>Produtora:</h2>
                        <p>{movie?.Producer}</p>
                        <h2>Diretor:</h2>
                        <p>{movie?.Director}</p>
                    </div>
                    <div className="movie-content">
                        <h2>Elenco:</h2>
                            {movie?.Cast.slice(0, 8).map((item, i) => <p key={i}>{item}</p>)}
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
                            {this.buildRating()}                   
                        </div>
                    </div>
                </div>
                <div className="trailer">
                    <iframe className="movie-trailer" src={this.getVideoUrl()} allowFullScreen="" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
            </section>
        );
    }
}
 
export default MoviePage;