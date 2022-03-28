// const req = require('express/lib/request');
// const res = require('express/lib/response');
// const user = require('../models/user');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(user) return res.status(400).json({
            message: 'Admin already registered'
        });

        const {
            firstName,
            lastName,
            username,
            email,
            password
        } = req.body;
        const _user = new User({
         firstName,
         lastName,
         username,
         email,
         password,
         role: 'admin'
        //  username: Math.random().toString()
        });

        _user.save((error, data) => {
           if(error){
               return res.status(400).json({
                   message: 'Something went wrong',
                   error:error
               });
           }

           if(data){
               return res.status(201).json({
                   message:'Admin created Successfully...!'
               })
           }
        });
    });
}


exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(error) return res.status(400).json({ error});
        if(user){

            if(user.authenticate(req.body.password) && user.role === 'admin'){
                const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '2h'});
                const { _id, firstName, lastName, username, email, role, fullName } = user;
                res.status(200).json({
                    token,
                    user: { _id, firstName, lastName, username, email, role, fullName }
                });
            }else{
                return res.status(400).json({
                    message: 'Invalid Password'
                })
            }

        }else{
            return res.status(400).json({message: 'Something went wrong'});
        }
    } ); 
}

