import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    recipe: {
      type: Schema.ObjectId,
      required: true,
      ref: "FoodRecipe",
    },
    content: {
      type: String,
      required: [true, "Please provide a content"],
      minlength: [3, " Please provide a content least 3 characters"],
    },
    author: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    star: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", CommentSchema);

export default Comment;
