import React from 'react'
import api from '../services/api';
import '../style/style-home.css'
import { MovieGrid } from './MovieGrid';

const { search } = window.location;
const query = new URLSearchParams(search).get('search');

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: null,
            categories: null,
            dataBaseMovies: null
        }

        this.sortMovies = this.sortMovies.bind(this);
    }    

    filterMovies(movies, query){        
        return movies.filter(el => el.Name.toUpperCase().includes(query.toUpperCase()));        
    }

    componentDidMount() {                    

        api.get("filmes/busca").then(res => {
            let movies = res.data;
            const categories = this.getCategories(movies);            
            if (query)
                movies = this.filterMovies(movies, query);

            this.setState({
                movies: movies,
                categories: categories,
                dataBaseMovies: movies
            });
        })
        .catch(err => {
            console.log(err);
            if (err.response)
                alert(err.response.data);
            else
                alert(err);
        });
    }

    filterCategory = event => {
        
        const category = event.target.value.toUpperCase();                
        if (!category){
            const dbMovies = this.state.dataBaseMovies;
            this.setState({
                movies: dbMovies
            });
            return;
        }

        const movies = this.state.dataBaseMovies;
        let moviesToShow = [];

        movies.forEach((movie) => {
            let movieCategory = movie.Category.toUpperCase();
            if (movieCategory === category)
                moviesToShow.push(movie);                
        });        
        
        this.setState({
            movies: moviesToShow
        });
    }

    sortMovies(sortType, ascOrDesc){                  

        let movies = this.state.movies;
        if (movies){
            movies.sort((a, b) => {
                if (ascOrDesc === 'desc')
                    return this.sortDesc(a, b, sortType);

                return this.sortAsc(a, b, sortType);                
            });            
        }

        this.setState({
            movies: movies
        });
    }    

    sortDesc(a, b, sortType){
        if (a[sortType] < b[sortType])
            return 1;

        if (a[sortType] > b[sortType])
            return -1;

        return 0;
    }

    sortAsc(a, b, sortType){
        if (a[sortType] > b[sortType])
            return 1;

        if (a[sortType] < b[sortType])
            return -1;

        return 0;
    }

    getCategories(movies) {
        let array = [ "" ];        
        const categories = movies.map(el => el.Category);
        categories.filter(distinct).forEach(element => {
            array.push(element);            
        });                
        return array;
    }

    render() {
        return (
            <section>
                <section className="order">
                    <div className="order-select-h2">
                        <h2>Filtrar Categoria:</h2>
                        <select className="order-select" id="category-filter" onChange={this.filterCategory}>
                            {this.state.categories ? this.state.categories.map((item, i) => <option key={i} value={item}>{item}</option>) : null}                                                 
                        </select>
                    </div>

                    <h2>Filtros de ordenação:</h2>
                    <input className="order-button" type="button" value="Por Nome" onClick={() => this.sortMovies('Name', 'asc')}/>
                    <input className="order-button" type="button" value="Por Categoria" onClick={() => this.sortMovies('Category', 'asc')}/>
                    <input className="order-button" type="button" value="Por Avaliação" onClick={() => this.sortMovies('MediumRating', 'desc')}/>
                    <input className="order-button" type="button" value="Por Ano" onClick={() => this.sortMovies('ReleaseDate', 'desc')}/>
                </section>

                <MovieGrid movies={this.state.movies} title={query ? "Resultados de Busca:" : "Filmes:"}/>
            </section>
        );
    }
}

export default Home;

const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
}