const Review = require("../model/ReviewModel");
async function createReview(req, res, next) {
  const { userId, blogId, content, rating } = req.body;
  const review = new Review({
    userId,
    blogId,
    content,
    rating,
  });
  try {
    await review.save();
    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllReviews(req, res, next) {
  try {
    const reviews = await Review.find();
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    next(error);
  }
}

async function updateReview(req, res, next) {
  const { id } = req.params;
  const { content, rating } = req.body;
  try {
    const review = await Review.findByIdAndUpdate(
      id,
      { content, rating },
      { new: true }
    );
    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  const { id } = req.params;
  try {
    const review = await Review.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
