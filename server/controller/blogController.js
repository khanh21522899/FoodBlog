const mongoose = require('mongoose');
const FoodBlog = require('../model/FoodBlogModel')
const User = require('../model/UserModel')



// Lay tat ca cac blogs
const getAllBlogs = async (req, res, next) => {
  let blogs;
  let totalDocCount;
  try {
    blogs = await FoodBlog.find().populate({
      path: 'author',
      select: 'name image'
    });
    totalDocCount = await FoodBlog.estimatedDocumentCount();
    console.log(blogs);
  } catch (error) {
    return next(error);
  }


  res.status(200).json({
    success: true,
    blogs,
    totalDocCount
  });
}

// Lay Blogs theo trang
const getBlogsFromPage = async (req, res, next) => {
  let blogs;
  let totalDocCount;
  let { page } = req.query;
  try {
    blogs = await FoodBlog.find().skip((page - 1) * 12).limit(12);
    totalDocCount = await FoodBlog.estimatedDocumentCount();
  } catch (error) {
    return next(error);
  }
  console.log(blogs);
  res.status(200).json({
    success: true,
    blogs,
    totalDocCount
  });
}


// Lay blog theo id
const getBlog = async (req, res, next) => {
  let blog;
  try {
    blog = await FoodBlog.findById(req.params.id).populate({
      path: 'author',
      select: 'name image'
    });
  } catch (error) {
    return next(error);
  }
  res.status(200).json(blog);
}

// Tao blog
const createBlog = async (req, res, next) => {
  let blog;
  // dung destructuring de lay cac thuoc tinh cua blog tu body
  let { title, duration, description, images, content } = req.body;
  console.log(req.body)
  try {
    let userId = new mongoose.Types.ObjectId(req._id);
    console.log(req.author);

    let blogId = new mongoose.Types.ObjectId();
    blog = await FoodBlog.create({
      _id: blogId,
      title,
      duration,
      description,
      author: userId,
      images,
      content,
    })


  } catch (error) {
    return next(error);
  }
  res.status(200).json(blog);
}


module.exports = {
  getAllBlogs,
  getBlog,
  getBlogsFromPage,
  createBlog
}
