import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  addAddressController,
  deleteAddressController,
  editAddress,
  getAddressController,
  getSingleAddress,
} from "../controllers/addressController.js";

const addressRouter = Router();

addressRouter.post("/add", auth, addAddressController);
addressRouter.get("/get", auth, getAddressController);
addressRouter.get("/:id", auth, getSingleAddress);
addressRouter.delete("/:id", auth, deleteAddressController);
addressRouter.put("/:id", auth, editAddress);

export default addressRouter;
