const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = mongoose.model("Movies");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

router.post('/novo', upload.single('file'), (req, res, next) => {
    
    Movie.findOne({Name: req.body.name}).lean().then((movie) => 
    {        
        if (movie) {
            res.status(500).send("Filme já existe!");
        }
        else {           

            var newMovie = new Movie({
                Name: req.body.name,                   
                Category: req.body.category,
                ReleaseDate: req.body.releaseDate,
                Producer: req.body.producer,
                Director: req.body.director,
                Cast: req.body.cast.split(';'),
                Duration: req.body.duration,
                Trailer: req.body.trailer,
                Synopsis: req.body.synopsis,
                ImagePath: req.body.fileName,
                TotalRating: 0,
                RatingCount: 0,
                MediumRating: 0
            });            

            newMovie.save().then(() => {                            
                res.status(200).send("Filme cadastrado com sucesso!");
            }).catch((error) => {            
                res.status(500).send(error);
            });
        }
    });    
});

router.get('/busca', (req, res) => {    
    Movie.find().lean().then((movies) => {
        if (movies){            
            res.status(200).json(movies);            
        }
    })
    .catch(err => {
        res.status(500).send(err);
    });    
});

router.get('/detalhes/:id', (req, res) => {                                                   

    Movie.findById(req.params.id).lean().then((movie) => {
        res.status(200).json(movie);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.post('/avaliar', (req, res) => {    
    Movie.findById(req.body.id).lean().then((movie) => {        
        let totalRating = movie.TotalRating + req.body.rating;
        let ratingCount = movie.RatingCount + 1;
        let mediumRating = Math.round(totalRating / ratingCount * 10) / 10;
        
        Movie.findByIdAndUpdate(req.body.id, { 
            TotalRating: totalRating,
            RatingCount: ratingCount,
            MediumRating: mediumRating
        }, { returnOriginal: false }).lean().then((movie) => {            
            res.status(200).json(movie);
        });        
    });
});

module.exports = router;