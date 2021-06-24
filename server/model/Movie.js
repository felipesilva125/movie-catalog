const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie = Schema({
    Name: {
        type: String,
        required: true
    },
    Category: {
        type: Array,
        required: true
    },
    ReleaseDate: {
        type: Date,
        required: true
    },
    TmdbID: {
        type: Number,
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
    },
    MediumRating: {
        type: Number,
        required: true,
        default: 0
    }
});

mongoose.model("Movies", Movie);