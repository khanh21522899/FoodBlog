const { SchemaTypes } = require("mongoose")
const { Schema, ...mongoose } = require('mongoose')


const FoodBlogSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  duration: Number,
  description: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  images: [{ type: String }],
  content: String,
  createdDate: { type: Date },
  updatedDate: { type: Date },
})












module.exports = mongoose.model('FoodBlog', FoodBlogSchema)
