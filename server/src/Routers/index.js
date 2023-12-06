import { Router } from "express";
import recipeRoute from "./recipe.js";

const router = Router();
router.use("/api/recipe", recipeRoute);

export default router;
