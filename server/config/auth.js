const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
require('../model/User')
const User = mongoose.model("Users");

module.exports = function(passport){

    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {

        User.findOne({Email: email}).lean().then((user) => {
            console.log(user);

            if (!user)
                return done(null, false);
                    
            const equal = bcrypt.compareSync(password, user.Password);
            
            if (equal) {                
                return done(null, user);
            }
            else {                
                return done(null, false);            
            }
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
 
    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user);
        }).lean();        
    });
}