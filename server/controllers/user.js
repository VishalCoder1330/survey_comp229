const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const e = require('connect-flash');

/**
 * This function will register user info into system
 */
exports.registerUser = (req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error : err
            });
        }
        else{
            const user = new User({
                username : req.body.username,
                email : req.body.email,
                password : hash,
                displayName : req.body.displayName,
                created : req.body.date
            });
            user.save()
            .then(result => {
                res.status(200).redirect('/login');
            })
            .catch(err => {
                res.status(501).json({
                    error: err
                });
            });
        }
    });
};

exports.logUser = (req,res,next)=>{
    User.findOne({username : req.body.username}).exec()
    .then(user=>{
        if (!user) {
            return res.status(401).json({
                message: 'User Not Found'
            });
        }
        bcrypt.compare(req.body.password, user.password)
                .then(doMatch => {
                    const token = jwt.sign({
                        email: user.email
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    res.cookie('token',token,{httpOnly:true});
                    res.status(200).redirect('/home');
                })
                .catch(err => {
                    console.log(err);
                  res.status(401).redirect('/login');
                })
    })
    .catch(err => {
        res.status(201).json({
            error: err
        });
    })
}