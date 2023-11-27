const express = require('express')
const {loginUser, signupUser} = require ('../controller/userController.js')


const router = express.Router()


//Login Route
router.post('/login', loginUser)


//Signup Route
router.post('/signup', signupUser)




//Export module
module.exports = router