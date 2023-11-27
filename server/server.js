const express = require('express')
const BlogRoutes = require('./routes/BlogsRoute')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')


//create the server
const app = express()

app.use(cors());


//use middleware
app.use(express.json())

app.use(morgan('combined')); // 'combined' is one of the predefined log formats


//Routes
app.use('/api/v1/blogs', BlogRoutes);


//Error handling middleware
app.use((error, req, res, next) => {
  res.status(400).json({ success: false, error: error.message });
})

  
//connecting to DB
mongoose.connect(process.env.URI)
  .then(() => {
    //make the server listening on port 4567
    app.listen(process.env.PORT, () => {
      console.log('connect & listen on PORT: ' + process.env.PORT)
    })
  })
  .catch((e) => {
    console.log(e)
  })

