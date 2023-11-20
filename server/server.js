const express = require('express')
const BlogRoutes = require('./routes/BlogsRoute')
require('dotenv').config()
const mongoose = require('mongoose')


//create the server
const app = express()

//use middleware
app.use(express.json)




//Routes



//connecting to DB
mongoose.connect(process.env.URI)
    .then(()=>{
         //make the server listening on port 4567
        app.listen(process.env.PORT, ()=>{
            console.log('connect & listen')
        })
    })
    .catch((e)=>{
        console.log(e)
    })


