import React from 'react';
import { MovieCard } from './MovieCard';

export const MovieGrid = (props) => {
             
    return (  
        <section className="movie-grid">
            <h2>{props.title}</h2>
            <div className="container-gallery" id="container">                                     
                {props.movies?.map((item, i) => <MovieCard key={i} movie={item}/>)}
            </div>
        </section>
    );    
} 
