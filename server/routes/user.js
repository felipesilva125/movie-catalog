const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
require('../model/User')
const User = mongoose.model("Users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

router.post('/login', (req, res) => {    
    User.findOne({Email: req.body.email}).lean().then((user) => 
    {
        if (!user)
            res.status(500).send("Usuário não cadastrado!");
        else {
            const auth = bcrypt.compareSync(req.body.password, user.Password);
            if (auth) {
                let id = user._id;
                const token = jwt.sign({ id }, '12345', {
                    expiresIn: 300
                })                
                res.status(200).json({ token: token });
            }
            else {
                res.status(500).send("Senha inválida!");
            }
        }
    });
});

module.exports = router;