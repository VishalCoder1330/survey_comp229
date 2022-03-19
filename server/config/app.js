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


let createError = require('http-errors');
let  express = require('express');
let  path = require('path');
let  cookieParser = require('cookie-parser');
let  logger = require('morgan');


// modules for authentication
let session = require('express-session');
let passport = require('passport');


let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

//database setup
let mongoose = require('mongoose');
let DB = require('./db');

//point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

//to check if mongoose is working 
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

//routers set up

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let surveyRouter = require('../routes/survey');
let questionsRouter = require('../routes/questions');
let answerRouter = require('../routes/answer');


let  app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());



// create a User Model Instance
let userModel = require('../models/user');
let User = userModel.User;

// implement a User Authentication Strategy
passport.use(User.createStrategy());

// serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//let questionsModel = require('../models/questions');
// add images 

app.use('/public', express.static('./public'));

// routing

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/survey-list', surveyRouter);
app.use('/survey-view', questionsRouter);
app.use('/survey-answer', answerRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  
  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error'});
});


var fileSystem = require("fs");
var fastcsv = require("fast-csv");
 
app.use("/public", express.static(__dirname + "/public"));

app.listen(function () {
    console.log("Connected");
 
    app.get("/exportData", function (request, result) {
 
        var data = [{
            "question": "test",
            "questionsAnswer": "test answer"
        }, {
            
           "question": "test2",
            "questionsAnswer": "test2 answer"
          }
        ];
 
        var ws = fileSystem.createWriteStream("/public/data.csv");
      fastcsv
      .write(data, { headers: true })
      .on("finish", function () {
 
                result.send("<a href='../public/data.csv' download='data.csv' id='download-link'></a><script>document.getElementById('download-link').click();</script>");
            })
            .pipe(ws);
    });
});





module.exports = app;


