const { Schema, model } = require("mongoose");
const Comment = require("./comment.js");
const slugify = require("slugify");

const RecipeSchema = Schema({
  slug: String,
  Name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  Ingredients: {
    type: [String],
    required: true,
  },
  Method: {
    type: [String],
    required: true,
  },
  comments: [
    {
      type: Schema.ObjectId,
      ref: "Comment",
    },
  ],
});

RecipeSchema.pre("save", function(next) {
  if (!(this.isModified("Name") || this.isModified("Description"))) {
    next();
  }

  this.slug = this.makeSlug();
  next();
});

RecipeSchema.pre("remove", async function(next) {
  const recipe = await Recipe.findById(this._id);

  await Comment.deleteMany({
    recipe: recipe,
  });
});

RecipeSchema.methods.makeSlug = function() {
  return slugify(this.Name + " " + this.Description, {
    replacement: "-",
    remove: /[*+~.()'"!:@/?]/g,
    lower: true,
    strict: false,
    locale: "tr",
    trim: true,
  });
};

const Recipe = model("FoodRecipe", RecipeSchema);

module.exports = Recipe;
