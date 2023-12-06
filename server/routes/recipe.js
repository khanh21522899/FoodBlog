const express = require("express");
const imageUpload = require("../Helpers/handleImages/upload.js");
const checkRecipeExist = require("../middleware/database/checkRecipeExist.js");
const {
  editRecipe,
  deleteRecipe,
  detailRecipe,
} = require("../controller/recipe.js");

const router = express.Router();

router.get("/:id", checkRecipeExist, detailRecipe);
router.put(
  "/:id/edit",
  checkRecipeExist,
  imageUpload.single("image"),
  editRecipe
);
router.delete("/:id/delete", checkRecipeExist, deleteRecipe);

module.exports = router;
