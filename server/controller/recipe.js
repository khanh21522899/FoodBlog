const FoodBlog = require("../model/FoodBlogModel.js");
const imageDelete = require("../Helpers/handleImages/delete.js");

const editBlog = async (req, res) => {
  const { title, description, content, oldImages } = req.body;
  console.log(req.body);
  const { id } = req.params;
  const blog = await FoodBlog.findOne({ _id: id });

  blog.title = title;
  blog.description = description;
  blog.content = content;
  const newImages = req.files.map((data) => data.buffer.toString("base64"));
  if (Array.isArray(oldImages) && Array.isArray(newImages)) {
    blog.images = oldImages.concat(newImages);
  } else blog.images = oldImages || newImages || [];
  blog.updatedDate = Date.now();

  await blog.save();

  return res.status(200).json({
    success: true,
    // data: blog,
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
  const { id } = req.params;
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
