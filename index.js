

const bodyParser = require('body-parser');
var express = require('express');
const mongoose=require('mongoose')
var app = express();
app.use(bodyParser.json());


var passport = require('passport');
var authenticate = require('./authenticate');
app.use(passport.initialize());
app.use(passport.session());

function auth (req, res, next) {
    console.log(req.user);

    if (!req.user) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      next(err);
    }
    else {
          next();
    }
}



const url = 'mongodb://localhost:27017/sample';
const connect = mongoose.connect(url);

connect.then((db) => {

    console.log('Connected correctly to server');
	}, (err)=> {console.log(err);});


const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
const usersRouter = require('./routes/users');


app.use('/users', usersRouter);  

//app.use(auth);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

console.log("App is running");
app.listen(3000);