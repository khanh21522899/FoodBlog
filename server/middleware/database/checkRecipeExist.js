const FoodBlog = require("../../model/FoodBlogModel.js");
const CustomError = require("../../Helpers/error/customError.js");

const checkRecipeExist = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await FoodBlog.findOne({ _id: id });

  if (!recipe) {
    return next(new CustomError(`There is no recipe with id: ${id} `, 400));
  }

  next();
};

module.exports = checkRecipeExist;
