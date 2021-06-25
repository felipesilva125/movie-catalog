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

    function getCategory(movie) {
        let category;
        movie.Category.forEach(el => {
            if (category)
                category = category + " / " + el;
            else
                category = el;
        });

        return category;
    }

    return (
        <div className="item-gallery">
            <div className="image-grid">
                <img src={getImagePath(movie)} className="img-gallery" />
            </div>
            <div className="movie-data">
                <div className="line-1">
                    <h3 className="title-gallery" id="name-movie">{movie.Name}</h3>
                </div>
                <div className="line-2">
                    <h3 className="category-movie" id="category-movie">{getCategory(movie)}</h3>                    
                </div>
                <div className="line-3">
                    <h3 className="movie-date" id="movie-date">{formatDate(movie)}</h3>
                </div>
                <div className="line-4">
                    <div id="rating">
                        <h3 className="medium-rating">{movie.MediumRating}</h3>
                        <img id="icon-star" src={process.env.PUBLIC_URL + "/star1.png"} />
                    </div>
                    <Link to={`/filme/detalhes/${movie._id}`}>
                        <input type="button" value="Ver Mais +" />
                    </Link>
                </div>
            </div>
        </div>
    );
}