const User = require('../model/userModel')
const jwt = require('jsonwebtoken')

//create a token
const createUserToken = (_id) =>{
   return jwt.sign({_id : _id},process.env.SECRET, {expiresIn : '1d'})
}

const getUser = async (req, res) =>{
    const {token} = req.body
    try{
        const _id = await jwt.verify(token, process.env.SECRET)
        const user = await User.findById(_id)
        res.status(200).json({email: user.email, name: user.name, avatar: user.avatar})
    }
    catch (error){
        res.status(400).json({error:error.message})
    }
}

const updateUser = async (req, res)=>{
    const {token, name, newEmail, oldPassword, newPassword, avatar} = req.body
    try{
        const _id = await jwt.verify(token, process.env.SECRET)
        if(newEmail){
            
            const user = await User.updateEmail(_id, newEmail)
            console.log('here')
        }
        if(newPassword){
            const user = await User.updatePassword (_id, oldPassword, newPassword)
        }
        if(name){
            const user = await User.findByIdAndUpdate(_id, {name: name}, {new: true})
            //res.status(200).json({'here'})
        }
        if(avatar){
            const user = await User.findByIdAndUpdate(_id, {avatar: avatar}, {new: true})
        }
        
        const user = await User.findById(_id)
        res.status(200).json({user})
    }
    catch(error){
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

module.exports = {loginUser, signupUser, updateUser, getUser}