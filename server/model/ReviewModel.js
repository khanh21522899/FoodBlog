const { Schema, ...mongoose } = require("mongoose");
const ReviewSchema = new Schema({
  userId: Schema.Types.ObjectId,
  blogId: Schema.Types.ObjectId,
  content: String,
  rating: Number,
  date: Date,
});

module.exports = mongoose.model("Review", ReviewSchema);
