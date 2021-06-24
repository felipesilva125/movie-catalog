const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('./server/model/Movie')
const users = require('./server/routes/User')
const movies = require('./server/routes/Movie')
const Movie = mongoose.model("Movies");
const fs = require('fs')
const passport = require('passport');
require('./server/config/auth')(passport);
const session = require('express-session');
const cors = require('cors')

app.use(cors());

//Sessão de usuário
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

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

app.use(express.static(__dirname + '/client'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/front/home/home.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/front/register/register.html'));
});

app.get('/filme', (req, res) => {
    res.end(fs.readFileSync(__dirname+'/client/front/register/register.html'));
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

app.get('/filme/:id', (req, res) => {                                                   

    Movie.findById(req.params.id).lean().then((movie) => {
        res.writeHead(200, {
                'Content-Type': 'text/html',
                'movie': JSON.stringify(movie)
            });        
        res.end(fs.readFileSync(__dirname+'/client/front/movie/movie.html'));        
    }).catch((err) => {
        res.writeHead(500, {
            'Content-Type': 'text/html',
            'error': err
        });
        res.end(fs.readFileSync(__dirname+'/client/front/movie/movie.html'));        
    });
});

app.post('/filme/avaliar', (req, res) => {
    Movie.findById(req.body.id).lean().then((movie) => {        
        let totalRating = movie.TotalRating + req.body.rating;
        let ratingCount = movie.RatingCount + 1;
        
        Movie.findByIdAndUpdate(req.body.id, { 
            TotalRating: totalRating,
            RatingCount: ratingCount
        }, { returnOriginal: false }).lean().then((movie) => {            
            res.json(movie);            
            res.end();
        });        
    });
});

app.post('/novo-filme', (req, res) => {
    const formidable = require('formidable');    
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {                

        var oldPath = files.image.path;                
        var extension = path.extname(files.image.name);
        var newPath = path.join(__dirname,'/client/images/', fields.name + extension);

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
            ImagePath: newPath,
            TotalRating: 0,
            RatingCount: 0
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
    res.sendFile(path.join(__dirname+'/client/front/error/error-page.html'));
});

app.use('/usuario', users);
app.use('/filmes', movies);

app.use(function (req, res, next) {
    res.status(404).redirect('/not-found');
})

const port = 8082;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});