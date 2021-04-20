const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('./model/Movie')
const Movie = mongoose.model("Movies");

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

app.get('/login', (req, res) => {    
    res.sendFile(path.join(__dirname+'/views/front/login.html'));
});

app.get('/cadastro-usuario', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/front/register/user-register/user-register.html'));
});

app.post('/admin/novo-filme', (req, res) => {
    const formidable = require('formidable');
    const fs = require('fs');
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {        

        Movie.findOne({Name : fields.name}).lean().then((movie) => {
            if (movie) {
                //gera mensagem de erro para o front
                console.log('ja tem')
            }
            else {

                var oldPath = files.image.path;                
                var extension = path.extname(files.image.name);
                var newPath = path.join(__dirname,'/images/', fields.name + extension);

                console.log(oldPath);
                console.log(extension);
                console.log(newPath);

                var newMovie = new Movie({
                    Name: fields.name,                   
                    Category: fields.category,
                    ReleaseDate: fields.releaseDate,
                    Producer: fields.producer,
                    Director: fields.director,
                    Cast: fields.cast,
                    Duration: fields.duration,
                    Trailer: fields.trailer,
                    Synopsis: fields.synopsis,
                    ImagePath: newPath
                });

                newMovie.save().then(() => {
                    //gera mensagem de sucesso para o front
                    console.log('salvou')
                    fs.renameSync(oldPath, newPath);

                }).catch((error) => {
                    //gera mensagem de erro para o front
                    console.log('deu erro')
                });
            }
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