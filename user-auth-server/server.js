require("dotenv").config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const Pig = require('pigcolor');

const app = express();


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




// Starting a port here
app.listen(Port, () => {
    Pig.server(Port);
});