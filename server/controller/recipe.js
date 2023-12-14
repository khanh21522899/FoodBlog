const FoodBlog = require("../model/FoodBlogModel.js");
const imageDelete = require("../Helpers/handleImages/delete.js");

const editBlog = async (req, res) => {
  // const { slug } = req.params;
  const { title, description, content, img } = req.body;

  const { id } = req.params;
  const blog = await FoodBlog.findOne({ _id: id });

  blog.title = title;
  blog.description = description;
  blog.content = content;
  blog.images.push(img);
  blog.updatedDate = Date.now();

  //recipe.img = req.localSavedImage;

  // if (!req.localSavedImage) {
  //   // if the image is not sent
  //   recipe.img = img;
  // } else {
  //   // if the image sent
  //   // old image locatıon delete
  //   previousImage && imageDelete(req, previousImage);
  // }
  await blog.save();

  return res.status(200).json({
    success: true,
    data: blog,
  });
};

const detailBlog = async (req, res) => {
  const { id } = req.params;

  const blog = await FoodBlog.findOne({ _id: id }); //.populate("author");

  return res.status(200).json({
    success: true,
    data: blog,
  });
};

const deleteBlog = async (req, res) => {
  const { id } = req.body;
  //const blog = await FoodBlog.findOne({ _id: id });

  //imageDelete(req, story.image);

  await FoodBlog.deleteOne({ _id: id });

  return res.status(200).json({
    success: true,
    message: "Blog deleted succesfully ",
  });
};

module.exports = {
  editRecipe: editBlog,
  detailRecipe: detailBlog,
  deleteRecipe: deleteBlog,
};
