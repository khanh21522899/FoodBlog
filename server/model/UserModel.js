const { Schema, ...mongoose } = require('mongoose')


const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: String,
  password: String,
  name: String,
  email: String,
  image: String
})


module.exports = mongoose.model('User', UserSchema)

