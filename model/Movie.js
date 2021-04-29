const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie = Schema({
    Name: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    ReleaseDate: {
        type: Date,
        required: true
    },    
    Producer: {
        type: String,
        required: true
    },
    Director: {
        type: String,
        required: true
    },
    Cast: {
        type: Array,
        required: true
    },
    Duration: {
        type: Number,
        required: true
    },
    Trailer: {
        type: String,
        required: true
    },
    Synopsis: {
        type: String,
        required: true
    },
    ImagePath: {
        type: String,
        required: true
    },
    TotalRating: {
        type: Number,
        required: true,
        default: 0
    },
    RatingCount: {
        type: Number,
        required: true,
        default: 0
    }
});

mongoose.model("Movies", Movie);