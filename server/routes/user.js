const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
require('../model/User')
const User = mongoose.model("Users");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const fs = require('fs');

router.get('/cadastrar', (req, res) => {    
    res.sendFile(path.join(__dirname, '../../client/front/register/register-user.html'));
});

router.post('/valida', (req, res) => {    
    User.findOne({Email: req.body.email}).lean().then((user) => 
    {        
        if (user) {                    
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end();
        }
        else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end();
        }
    });    
});

router.post('/novo', (req, res) => {

    User.findOne({Email: req.body.email}).lean().then((user) => 
    {        
        if (user) {                    
            res.status(500).send("Usuário já existe!");
        }
        else {

            const newUser = new User({
                Name: req.body.name,
                Email: req.body.email,
                Password: req.body.password
            });
        
            //criptografa senha
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.Password, salt, (error, hash) => {            
                    newUser.Password = hash;
                    newUser.save().then(() => {                
                        res.status(200).send("Usuário cadastrado com sucesso!");
                    }).catch((error) => {
                        res.status(500).send(error);
                    });
                });
            });
        }
    }).catch((error) => {
        res.status(500).send(error);
    });    
});

router.get('/login', (req, res) => {    
    if (req.query.fail){        
        res.writeHead(401, {
            'Content-Type': 'text/html',
            'error': "Usuário e/ou senha incorretos!"
        });
    }
    else {
        res.writeHead(200, {
            'Content-Type': 'text/html'            
        });
    }

    res.end(fs.readFileSync(path.join(__dirname, '../../client/front/login/login.html')));
});

router.post('/login', 
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/usuario/login?fail=true'
    })
);

router.get('/user', (req, res) => {
    res.send(req.user);
});

router.get('/teste', (req, res) => {
    res.send({
        teste: "abc",
        teste2: "def"
    });
});

router.get('/logout', (req, res) => {        
    req.logout();
    res.redirect("/");
});

module.exports = router;