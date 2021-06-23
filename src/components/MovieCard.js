import React from 'react';
import { Link } from 'react-router-dom'

class MovieCard extends React.Component {

    formatDate(movie){
        return new Date(movie.ReleaseDate).getFullYear();
    }

    render() { 
        const movie = this.props.movie;        
        return (  
            <div className="item-gallery">                
                <img src={process.env.PUBLIC_URL + movie.ImagePath} className="img-gallery" />
                <h2 className="title-gallery" id="name-movie">{movie.Name}</h2>
                <h2 className="movie-date" id="movie-date">{this.formatDate(movie)}</h2>
                <h2 className="category-movie" id="category-movie">{movie.Category}</h2>
                <h2 className="medium-rating" id="medium-rating">{movie.MediumRating}</h2>
                <img id="icon-star" src={process.env.PUBLIC_URL + "/star1.png"}/>
                <Link to={`/filme/detalhes?movie=${movie._id}`}>
                    <input type="button" value="Ver Mais +"/>
                </Link>
            </div>
        );
    }
}
 
export default MovieCard;