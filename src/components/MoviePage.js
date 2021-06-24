import React from 'react';
import Modal from '../components/Modal'
import api from '../services/api';
import { isAuthenticated } from '../services/auth';
import { tmdbApi } from '../services/tmdbApi';
import '../style/style-movie.css'


class MoviePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: null,
            show: false,
            title: "",
            message: ""
        };
    }

    componentWillMount() {

        const id = this.props.match.params.id;

        if (!id)
            return;

        api.get(`filmes/detalhes/${id}`).then(res => {
            let movie = res.data;
            Promise.all([
                tmdbApi.get(`/${movie.TmdbID}?language=pt-BR`),
                tmdbApi.get(`/${movie.TmdbID}/credits`),
                tmdbApi.get(`/${movie.TmdbID}/videos?language=pt-BR`)
            ]).then(([a, b, c]) => {
                const movieInfo = a.data;
                const credits = b.data;
                const videos = c.data;
                this.setMovieInfo(movie, movieInfo, videos);
                this.setCredits(movie, credits);
                this.setState({
                    movie: movie
                });
            }).catch(err => {
                alert(err);
            })
        }).catch(err => {
            alert(err);
        });
    }

    setCredits(movie, credits) {
        movie.Cast = credits.cast.map((item, i) => item.name);
        movie.Director = credits.crew.find(el => el.job === "Director").name;
    }

    setMovieInfo(movie, movieInfo, videos) {
        movie.Producer = movieInfo.production_companies[0].name;
        movie.Synopsis = movieInfo.overview;
        console.log(videos.results);
        movie.Trailer = videos.results.find(el => el.type === "Trailer" && el.site === "YouTube")?.key;

        if (!movie.Trailer)
            movie.Trailer = videos.results.find(el => el.type === "Teaser" && el.site === "YouTube")?.key;

        movie.TmdbRating = movieInfo.vote_average;
    }

    rateMovie(value) {
        if (isAuthenticated()) {
            const id = this.state.movie._id;
            const data = {
                id: id,
                rating: value
            }

            api.post('filmes/avaliar', data).then((res) => {
                localStorage.setItem(id + '_rating', value);
                window.location.reload()
            }).catch((err) => {
                this.showModal('Erro!', 'Erro ao tentar avaliar filme!');
            });
        }
        else {
            this.showModal('Erro!', 'Sem usuário autenticado.');
        }
    }

    showModal = (title, message) => {
        this.setState({
            show: !this.state.show,
            title: title,
            message: message
        });
    };

    getVideoUrl() {
        let videoId = this.state.movie?.Trailer;
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playlist=${videoId}&loop=1&controls=0"`;
    }

    buildRating() {
        let itemList = [];
        let rating = localStorage.getItem(this.state.movie?._id + '_rating');

        for (let i = 1; i <= 5; i++) {
            let image = "/star0.png";

            if (rating && rating >= i) {
                image = '/star1.png';
            }

            itemList.push(<img key={i} src={process.env.PUBLIC_URL + image} onClick={() => this.rateMovie(i)} />)
        }

        return itemList;
    }

    getCategory() {
        let category;

        const categories = this.state.movie?.Category;
        if (categories) {
            categories.forEach(el => {
                if (!category)
                    category = el;
                else
                    category = `${category} / ${el}`
            })
        }

        return category;
    }

    getImagePath(movie) {
        try {
            const image = require('../images/' + movie?.ImagePath).default;
            return image;
        }
        catch (error) {

        }
    }

    render() {
        const movie = this.state.movie;
        document.title = movie?.Name;
        return (
            <section className="movie-info" id="main-section">
                <Modal onClose={e => this.showModal(e, '', '')} show={this.state.show} title={this.state.title} message={this.state.message}></Modal>
                <h1 style={{ textAlign: 'center', fontSize: 3 + 'em' }}>{movie?.Name}</h1>
                <div className="main-info">
                    <div className="movie-picture">
                        <img src={movie ? this.getImagePath(movie) : null} itemProp="image" alt="Velozes e Furiosos 6" />
                    </div>
                    <div className="movie-content">
                        <h2>Ano de Estréia:</h2>
                        <p>{movie ? new Date(movie.ReleaseDate).getFullYear() : null}</p>
                        <h2>Categoria:</h2>
                        <p>{this.getCategory()}</p>
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

                    <div style={{ display: "inline-list-item" }}>
                        <h1>Avaliações:</h1>
                        <div style={{ display: "inline-flex" }}>
                            <div className="rating">
                                <h2>Média:</h2>
                                <div className="medium-rating-movie">
                                    <h1 id="medium-rating-movie" style={{ fontSize: 3 + 'em', textAlign: 'center' }}>{movie?.MediumRating}</h1>
                                    <img src={process.env.PUBLIC_URL + "/star1.png"} style={{ width: 50 + 'px', height: 50 + 'px' }}/>
                                </div>
                            </div>
                            <div className="rating">
                                <h2>Avaliar:</h2>
                                <div className="rate-movie">
                                    {this.buildRating()}
                                </div>
                            </div>
                        </div>
                        <div className="rating">
                            <h2>TMDB:</h2>
                            <div className="medium-rating-movie">
                                <h1 style={{ fontSize: 3 + 'em', textAlign: 'center' }}>{movie?.TmdbRating}</h1>
                                <img src={process.env.PUBLIC_URL + "/tmdb.png"} style={{ width: 50 + 'px', height: 50 + 'px' }} />
                            </div>
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