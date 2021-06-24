const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const users = require('./server/routes/User')
const movies = require('./server/routes/Movie')
const cors = require('cors')

app.use(cors());

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

app.use(express.static(__dirname + '/server/home'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/server/home/home.html');
});

app.use('/usuario', users);
app.use('/filmes', movies);

const port = 8082;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});