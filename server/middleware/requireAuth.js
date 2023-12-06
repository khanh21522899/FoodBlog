const jwt = require ('jsonwebtoken')
const User = require ('../model/userModel')

const requireAuth = async (req, res, next) =>{

    const {authorization} = req.headers

    if(!authorization){
        res.status(401).json({error: 'Failure authorize'})
    }

    const token = authorization.split(" ")[1]

    try{
        //decode id from token
        const {_id} = await jwt.verify(token, process.env.SECRET)
        //make sure the id represent a user that exists and attach the id to the request for another use
        req.user = await User.findById(_id).select('_id')
        next()
    }
    catch(error){
        console.log(error)
        res.status(401).json({error: 'Failure authorize'})
    }

}

module.exports = requireAuth