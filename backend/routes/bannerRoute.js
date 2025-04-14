import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "./../middlewares/multer.js";
import {
  addBanner,
  deleteBanner,
  getBanner,
  getSingleBanner,
  updateBanner,
  uploadImages,
} from "../controllers/bannerController.js";
import { removeImageFromCloudinary } from "../controllers/categoryController.js";

const bannerRouter = Router();

bannerRouter.post("/uploadImages", auth, upload.array("images"), uploadImages);
bannerRouter.post("/add", auth, addBanner);
bannerRouter.get("/", getBanner);
bannerRouter.get("/get", getSingleBanner);
bannerRouter.delete("/deleteImg", auth, removeImageFromCloudinary);
bannerRouter.delete("/:id", auth, deleteBanner);
bannerRouter.post("/:id", auth, updateBanner);

export default bannerRouter;
