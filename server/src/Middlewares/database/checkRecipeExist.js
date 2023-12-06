import Recipe from "../../Models/recipe.js";
import CustomError from "../../Helpers/error/customError.js";

const checkRecipeExist = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await Recipe.findOne({ _id: id });

  if (!recipe) {
    return next(new CustomError("There is no recipe with that id ", 400));
  }

  next();
};

export default checkRecipeExist;
