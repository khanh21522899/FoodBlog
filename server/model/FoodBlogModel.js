const { SchemaTypes } = require("mongoose")
const { Schema, ...mongoose } = require('mongoose')


const FoodBlogSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  duration: Number,
  description: String,
  author: Schema.Types.ObjectId,
  images: [{ type: String }],
  content: String,
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('FoodBlog', FoodBlogSchema)



