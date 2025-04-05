import { Router } from "express";
import {
  addReview,
  authWithGoogle,
  changePassowrd,
  forgotPasswordController,
  getReviews,
  imageUploadController,
  loginUserController,
  logoutController,
  refreshToken,
  registerUserController,
  removeImageFromCloudinary,
  resetPassword,
  updateUserDetailsController,
  userDetails,
  verifyEmailController,
  verifyForgotPasswordOtp,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/authWithGoogle", authWithGoogle);
userRouter.post("/verifyemail", verifyEmailController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", auth, logoutController);
userRouter.put(
  "/user-avatar",
  auth,
  upload.array("avatar"),
  imageUploadController
);
userRouter.delete("/deleteImg", auth, removeImageFromCloudinary);
userRouter.put("/:id", auth, updateUserDetailsController);
userRouter.post("/forgot-password", forgotPasswordController);
userRouter.post("/verify-forgot-password-otp", verifyForgotPasswordOtp);
userRouter.post("/resetPassword", resetPassword);
userRouter.post("/changePassowrd", changePassowrd);
userRouter.post("/refreshToken", refreshToken);
userRouter.get("/userDetails", auth, userDetails);

userRouter.post("/addReview", auth, addReview);
userRouter.get("/getReview", getReviews);

export default userRouter;
