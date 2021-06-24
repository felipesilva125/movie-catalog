import React from 'react';
import { Link } from 'react-router-dom'

export const MovieCard = (props) => {

    const movie = props.movie;

    function formatDate(movie) {
        return new Date(movie.ReleaseDate).getFullYear();
    }

    function getImagePath(movie) {                    
        try {
            const image = require('../images/' + movie?.ImagePath).default;
            return image;
        }
        catch (error) {

        }        
    }

    function getCategory(movie){
        let category;
        movie.Category.slice(0,2).forEach(el => {
            if (category)
                category = category + " / " + el;
            else 
                category = el;
        });       

        return category;
    }

    return (
        <div className="item-gallery">
            <img src={getImagePath(movie)} className="img-gallery" />
            <h2 className="title-gallery" id="name-movie">{movie.Name}</h2>
            <h2 className="movie-date" id="movie-date">{formatDate(movie)}</h2>
            <h2 className="category-movie" id="category-movie">{getCategory(movie)}</h2>
            <h2 className="medium-rating" id="medium-rating">{movie.MediumRating}</h2>
            <img id="icon-star" src={process.env.PUBLIC_URL + "/star1.png"} />
            <Link to={`/filme/detalhes/${movie._id}`}>
                <input type="button" value="Ver Mais +" />
            </Link>
        </div>
    );
}