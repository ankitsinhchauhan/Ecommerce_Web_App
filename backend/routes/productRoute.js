import { Router } from "express";
import auth from "./../middlewares/auth.js";
import upload from "./../middlewares/multer.js";
import {
  createProduct,
  createProductWeight,
  deleteMultipleProduct,
  deleteProduct,
  deleteProductWeight,
  filters,
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
  getProductWeight,
  getProductWeightById,
  removeImageFromCloudinary,
  sortBy,
  UpdateProduct,
  UpdateProductWeight,
  uploadImages,
} from "../controllers/productController.js";

const productRouter = Router();

productRouter.post("/uploadImages", auth, upload.array("images"), uploadImages);

productRouter.post("/create", auth, createProduct);
productRouter.get("/getAllProducts", getAllProduct);
productRouter.get("/getAllProductsByCatId/:id", getAllProductsByCatId);
productRouter.get("/getAllProductsByCatName", getAllProductsByCatName);
productRouter.get("/getAllProductsByPrice", getAllProductsByPrice);
productRouter.get("/getAllProductsByRating", getAllProductsByRating);
productRouter.get("/productCounts", getProductCount);
productRouter.get("/getFeaturedProducts", getFeaturedProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/:id", getProduct);
productRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
productRouter.put("/updateProduct/:id", auth, UpdateProduct);
productRouter.delete("/deleteMultiple", deleteMultipleProduct);

productRouter.post("/productWeight/create", auth, createProductWeight);
productRouter.delete("/productWeight/:id", deleteProductWeight);
productRouter.put("/productWeight/:id", auth, UpdateProductWeight);
productRouter.get("/productWeight/get", getProductWeight);
productRouter.get("/productWeight/:id", getProductWeightById);

productRouter.post("/filters", filters);
productRouter.post("/sortBy", sortBy);

export default productRouter;
