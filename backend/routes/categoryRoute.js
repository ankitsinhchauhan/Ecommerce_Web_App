import auth from "./../middlewares/auth.js";
import upload from "./../middlewares/multer.js";
import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCAllategories,
  getCategoriesCount,
  getCategory,
  getSubCategoriesCount,
  removeImageFromCloudinary,
  updateCategory,
  uploadImages,
} from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.post(
  "/uploadImages",
  auth,
  upload.array("images"),
  uploadImages
);

categoryRouter.post("/create", auth, createCategory);
categoryRouter.get("/get", getCAllategories);
categoryRouter.get("/get/count", getCategoriesCount);
categoryRouter.get("/get/count/subCat", getSubCategoriesCount);
categoryRouter.get("/:id", getCategory);
categoryRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
categoryRouter.delete("/:id", auth, deleteCategory);
categoryRouter.put("/:id", auth, updateCategory);

export default categoryRouter;
