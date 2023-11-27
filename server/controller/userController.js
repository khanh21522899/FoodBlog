const User = require('../model/userModel')
const jwt = require('jsonwebtoken')

//create a token
const createUserToken = (_id) =>{
   return jwt.sign({_id : _id},process.env.SECRET, {expiresIn : '1d'})
}

const getUser = async (req, res) =>{
    const
}

const updateUser = async (req, res)=>{
    const {token, dataToUpdate} = req.body
    try{
        const _id = await jwt.verify(token, process.env.SECRET)
        const user = await User.findByIdAndUpdate(_id, dataToUpdate)
        res.status(200).json(user, dataToUpdate)
    }
    catch(error){
        res.status(400).json({error : error.message})
    }
    
}

const updateUserPassword = async (req, res)=>{
    const {token, email, oldPassword, newPassword} = req.body
    try{
        const _id = await jwt.verify(token, process.env.SECRET)
        const user = await User.updatePassword (_id, oldPassword, newPassword)
        res.status(200).json(user, {oldPassword}, {newPassword})
    }
    catch (error){
        res.status(400).json({error : error.message})
    }
}

//login: when user login secessful server response with a token that client can save to localstorage
const loginUser = async (req, res)=>{
    //destructure the email and password from http req body
    const {email , password} = req.body
    try {
        //sign up the user with the signup function adding to schema.stactic in model
       const user = await User.login(email, password)
        //assign user token
        const userToken = createUserToken(user._id)
        //if everythings ok response to client with status 200 and the token
        res.status(200).json({email, token: userToken})

    } catch (error){
        //if there 's an error return with response status 400
        res.status(400).json({error : error.message})
    }
    
}


//signup: when user signup secessful server response with a token that client can save to localstorage
const signupUser = async (req, res)=> {
    //destructure name, email & password from the body of http request
    const {name, email, password} = req.body
    try {
        //sign up the user with the signup function adding to schema.stactic in model
       const user = await User.signup(name, email, password)
        //assign user token
        const userToken = createUserToken(user._id)
        //if everythings ok response to client with status 200 and the token
        res.status(200).json({email, token: userToken})

    } catch (error){
        //if there 's an error return with response status 400
        res.status(400).json({error : error.message})
    }
}

module.exports = {loginUser, signupUser, updateUser, updateUserPassword}