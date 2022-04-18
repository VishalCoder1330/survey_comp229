/* Team: Group 3
  Web site name : Survey+
  Date : March 18, 2022
  Author's names & Student IDs:
    Jiaying Song - 301172953
    Nimish Patel - 301224017
    Vishalkumar Parekh - 301221947
    Deepkumar Patel - 301236607
    Gokulraj Venugopal – 301202722
    Dimple - 301225341
 */


let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

//controller separation logic to display each page
const checkLogIn = (req)=>{
    var flag;
    console.log('flaf',req.query.flag)
    if( !req.query.flag ||req.query.flag==0){
         flag = 0
    }
    else{
        flag = req.query.flag;
    }
    return flag;
}

module.exports.displayHomePage = (req, res, next) => {
    var flag = checkLogIn(req);
    console.log('newFlg',flag);
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : '',flag:flag});
}

module.exports.displayAboutPage = (req, res, next) => {
    var flag = checkLogIn(req);
    res.render('index', {title: 'About', displayName: req.user ? req.user.displayName : '',flag:flag});
}

module.exports.displayProjectsPage = (req, res, next) => {
    var flag = checkLogIn(req);
    res.render('index', {title: 'Projects', displayName: req.user ? req.user.displayName : '',flag:flag});
}

module.exports.displayServicesPage = (req, res, next) => {
    var flag = checkLogIn(req);
    res.render('index', {title: 'Services', displayName: req.user ? req.user.displayName : '',flag:flag});
}

module.exports.displayContactPage = (req, res, next) => {
    var flag = checkLogIn(req);
    res.render('index', {title: 'Contact', displayName: req.user ? req.user.displayName : '',flag:flag});
}

module.exports.displayLoginPage = (req, res, next) => {
    var flag = checkLogIn(req);
    // check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login', 
        {
           title: "Login",
           messages: req.flash('loginMessage'),
           displayName: req.user ? req.user.displayName : '' ,
           flag:flag
        })
    }
    else
    {
        //redirection
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    var flag = checkLogIn(req);
    passport.authenticate('local',
    (err, user, info) => {
        // server err?
        if(err)
        {
            return next(err);
        }
        // is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');

            //redirection
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error?
            if(err)
            {
                return next(err);
            }

            /*const payload = 
            {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });
*/
            /* TODO - Getting Ready to convert to API
            res.json({success: true, msg: 'User Logged in Successfully!', user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }, token: authToken});
            */

            return res.redirect('/survey-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            // if no error exists, then registration is successful

            // redirect the user and authenticate them

            /* TODO - Getting Ready to convert to API
            res.json({success: true, msg: 'User Registered Successfully!'});
            */

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/survey-list')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}
