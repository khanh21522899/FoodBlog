const express = require('express')
const {loginUser, signupUser, updatePassword, getUser, updateEmail, updateName, updateAvatar} = require ('../controller/userController.js')
const requireAuth = require('../middleware/requireAuth.js')

const router = express.Router()


//Login Route
router.post('/login', loginUser)


//Signup Route
router.post('/signup', signupUser)

//check if user has already log in 

router.use(requireAuth)
//Dashboard Route
router.put ('/dashboard/updateuser/changename', updateName)
router.put ('/dashboard/updateuser/changeavatar', updateAvatar)
router.put ('/dashboard/updateuser/changeemail', updateEmail)
router.put ('/dashboard/updateuser/changepassword', updatePassword)

router.get('/dashboard', getUser)




//Export module
module.exports = router