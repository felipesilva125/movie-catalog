const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/home.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/login.html'));
});

app.get('/cadastro-usuario', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/user-register.html'));
});

const port = 8082;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});