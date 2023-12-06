import express from "express";
import imageUpload from "../Helpers/handleImages/upload.js";
import checkRecipeExist from "../Middlewares/database/checkRecipeExist.js";
import {
  editRecipe,
  deleteRecipe,
  detailRecipe,
} from "../Controllers/recipe.js";

const router = express.Router();

router.get("/:id", checkRecipeExist, detailRecipe);
router.put(
  "/:id/edit",
  checkRecipeExist,
  imageUpload.single("image"),
  editRecipe
);
router.delete("/:id/delete", checkRecipeExist, deleteRecipe);

export default router;
