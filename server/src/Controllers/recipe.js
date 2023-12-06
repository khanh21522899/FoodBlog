import Recipe from "../Models/recipe.js";
import imageDelete from "../Helpers/handleImages/delete.js";

export const editRecipe = async (req, res) => {
  // const { slug } = req.params;
  const { name, description, ingredients, methods, img, previousImage } =
    req.body;

  const { id } = req.params;
  const recipe = await Recipe.findOne({ _id: id });

  recipe.Name = name;
  recipe.Description = description;
  recipe.Ingredients = ingredients;
  recipe.Method = methods;

  //recipe.img = req.localSavedImage;

  // if (!req.localSavedImage) {
  //   // if the image is not sent
  //   recipe.img = img;
  // } else {
  //   // if the image sent
  //   // old image locatıon delete
  //   previousImage && imageDelete(req, previousImage);
  // }
  await recipe.save();

  return res.status(200).json({
    success: true,
    data: recipe,
  });
};

export const detailRecipe = async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipe.findOne({ _id: id }); //.populate("author");

  return res.status(200).json({
    success: true,
    data: recipe,
  });
};

export const deleteRecipe = async (req, res) => {
  const { slug } = req.params;
  const recipe = await Recipe.findOne({ slug: slug });

  imageDelete(req, story.image);

  await recipe.remove();

  return res.status(200).json({
    success: true,
    message: "Recipe deleted succesfully ",
  });
};
