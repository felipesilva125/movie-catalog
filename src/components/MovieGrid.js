import React from 'react';
import MovieCard from './MovieCard';

class MovieGrid extends React.Component {

    render() { 
        console.log(this.props)
        return (  
            <section className="movie-grid">
                <h2>Filmes:</h2>
                <div className="container-gallery" id="container">                                     
                    {this.props.movies?.map((item, i) => <MovieCard key={i} movie={item}/>)}
                </div>
            </section>
        );
    }
}
 
export default MovieGrid;