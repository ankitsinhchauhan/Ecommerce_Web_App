import { Router } from "express";
import auth from "./../middlewares/auth.js";
import upload from "./../middlewares/multer.js";
import {
  createProduct,
  deleteMultipleProduct,
  deleteProduct,
  getAllProduct,
  getAllProductsByCatId,
  getAllProductsByCatName,
  getAllProductsByPrice,
  getAllProductsByRating,
  getAllProductsBySubCatId,
  getAllProductsBySubCatName,
  getFeaturedProduct,
  getProduct,
  getProductCount,
  removeImageFromCloudinary,
  UpdateProduct,
  uploadImages,
} from "../controllers/productController.js";

const productRouter = Router();

productRouter.post("/uploadImages", auth, upload.array("images"), uploadImages);
productRouter.post("/create", auth, createProduct);
productRouter.get("/getAllProducts", getAllProduct);
productRouter.get("/getAllProductsByCatId/:id", getAllProductsByCatId);
productRouter.get("/getAllProductsByCatName", getAllProductsByCatName);
productRouter.get("/getAllProductsBySubCatId/:id", getAllProductsBySubCatId);
productRouter.get("/getAllProductsBySubCatName", getAllProductsBySubCatName);
productRouter.get("/getAllProductsByPrice", getAllProductsByPrice);
productRouter.get("/getAllProductsByRating", getAllProductsByRating);
productRouter.get("/productCounts", getProductCount);
productRouter.get("/getFeaturedProducts", getFeaturedProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/:id", getProduct);
productRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
productRouter.put("/updateProduct/:id", auth, UpdateProduct);
productRouter.delete("/deleteMultiple", deleteMultipleProduct);

export default productRouter;
