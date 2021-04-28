const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('./model/Movie')
const Movie = mongoose.model("Movies");
const fs = require('fs')

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/movie-catalog", {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to database.");
}).catch((error) => {
    console.log(`Error: ${error}`);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/front/home/home.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/front/register/movie-register/register.html'));
});

app.get('/filme', (req, res) => {
    res.end(fs.readFileSync(__dirname+'/views/front/register/movie-register/register.html'));
});

app.get('/login', (req, res) => {    
    res.sendFile(path.join(__dirname+'/views/front/login.html'));
});

app.get('/cadastro-usuario', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/front/register/user-register/user-register.html'));
});

app.post('/cadastro/valida-form', (req, res) => {       
    Movie.findOne({Name: req.body.name}).lean().then((movie) => 
    {        
        if (movie) {                    
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end();
        }
        else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end();
        }
    });
});

app.get('/busca-filmes', (req, res) => {
    Movie.find().lean().then((movies) => {
        if (movies){
            res.json(movies);
            res.end();
        }
    });    
});

app.get('/teste', (req, res) => {                                                   
    res.sendFile(path.join(__dirname+'/views/front/register/user-register/user-register.html'));
});

app.get('/filme/:id', (req, res) => {                                                   

    Movie.findById(req.params.id).lean().then((movie) => {
        res.writeHead(200, {
                'Content-Type': 'text/html',
                'movie': JSON.stringify(movie)
            });        
        res.end(fs.readFileSync(__dirname+'/views/front/movie/movie.html'));        
    }).catch((err) => {
        res.writeHead(500, {
            'Content-Type': 'text/html',
            'error': err
        });
        res.end(fs.readFileSync(__dirname+'/views/front/movie/movie.html'));        
    });
});

app.post('/novo-filme', (req, res) => {
    const formidable = require('formidable');
    const fs = require('fs');
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {                

        var oldPath = files.image.path;                
        var extension = path.extname(files.image.name);
        var newPath = path.join(__dirname,'/images/', fields.name + extension);

        var newMovie = new Movie({
            Name: fields.name,                   
            Category: fields.category,
            ReleaseDate: fields.releaseDate,
            Producer: fields.producer,
            Director: fields.director,
            Cast: fields.cast.split(';'),
            Duration: fields.duration,
            Trailer: fields.trailer,
            Synopsis: fields.synopsis,
            ImagePath: newPath
        });

        newMovie.save().then(() => {            
            fs.renameSync(oldPath, newPath);
        }).catch((error) => {            
            console.log(error);
        });                    
    });

    res.redirect('/cadastro');
});

app.get('/not-found', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/front/error-page.html'));
});

app.use(function (req, res, next) {
    res.status(404).redirect('/not-found');
})

const port = 8082;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});