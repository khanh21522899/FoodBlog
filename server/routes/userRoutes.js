const express = require('express')
const {loginUser, signupUser, updateUser, getUser} = require ('../controller/userController.js')


const router = express.Router()


//Login Route
router.post('/login', loginUser)


//Signup Route
router.post('/signup', signupUser)

//Dashboard Route
router.put ('/dashboard/updateUser', updateUser)

router.get('/dashboard', getUser)




//Export module
module.exports = router