const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcrypt')



const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    avatar: String,
    email:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required:true
    }
})

userSchema.statics.updatePassword = async function (_id, oldPassword, newPassword) {

    const user = await this.findById(_id)
        //making sure that oldPassword is match and new Password is strong enough
        const matchPassword = await bcrypt.compare(oldPassword, user.password)
        if(!matchPassword){
            throw Error ('The old password given is wrong')
        }
        if(!validator.isStrongPassword(newPassword)){
            throw Error ('new password is not strong enough')
        }
    
    const newUser = await this.findByIdAndUpdate (_id, {password: newPassword})
    
    return newUser
}
//add singup function to schema
userSchema.statics.signup = async function(name, email, password){

    const exists = await this.findOne({email})
 

    if( !name || !email || !password ){
        throw Error('All field must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('email is not valid')
    }
    
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }

    if(exists){
        throw Error('this email has already been used')
    }
   
    //encrypt the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    //create a user in db and return user
    const user = await this.create({name, email, password: hashPassword})

    return user

}

//add login function to schema
userSchema.statics.login = async function(email, password){

    if(!email || !password ){
        throw Error('All field must be filled')
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error('Email is not correct')
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if(!matchPassword){
        throw Error('Password incorrect')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)

