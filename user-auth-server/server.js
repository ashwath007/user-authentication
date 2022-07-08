require("dotenv").config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const passport = require('passport');
require('./passport');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');



const Pig = require('pigcolor');

const app = express();

app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());
// ?? Storage Module -----------------------------------------------



// ?? --------------------------------------------------------------

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



// *? ----------------------------------------------------------------

// ** ------------------ ( Application Route ) -----------------------

// !! Image Upload Section


// *? ----------------------------------------------------------------

//DB Connection
mongoose
    .connect(process.env.DATABASE_D, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        Pig.db();
    });



// Port

const Port = process.env.PORT || 8000;


// ** Testing 
app.get("/", (req, res) => {
    console.log("GET Requests")
    res.json({
        msg: "Photolink Server - Version 1.0.1"
    })
});

// ?? -------------- ( API ) ----------------------

// app.use('/api', uploadRoute);

// ?? ---------------------------------------------

app.get("/failed", (req, res) => {
    res.send("Failed")
})
app.get("/success", (req, res) => {
    res.send(`Welcome ${req.user.email}`)
})

app.get('/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function(req, res) {
        res.redirect('/success')

    }
);



// Starting a port here
app.listen(Port, () => {
    Pig.server(Port);
});