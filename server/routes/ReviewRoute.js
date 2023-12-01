const express = require("express");
const router = express.Router();

const {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
} = require("../controller/reviewController");

router.get("/", getAllReviews);
router.post("/", createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

//:id = route param
//?name=nam&age=24 query param
module.exports = router;
