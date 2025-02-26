import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  addAddressController,
  getAddressController,
} from "../controllers/addressController.js";

const addressRouter = Router();

addressRouter.post("/add", auth, addAddressController);
addressRouter.get("/get", auth, getAddressController);

export default addressRouter;
