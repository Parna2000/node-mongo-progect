const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();
require('./helpers/init_mongodb');

const AuthRoute = require('./routes/Auth.route');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',async(req,res,next)=>{
    res.send("Hello");
})

app.use('/auth',AuthRoute);

//catch all path
app.use(async(req,res,next)=>{
    // const error = new Error("Not found");
    // error.status = 404;
    // next(error);

    //using 'http-error' package
    next(createError.NotFound('This route does not exist'));
})

//will get executed whenever 'next(error)' will be called.
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})