import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  addToCartController,
  deleteCartItem,
  emptyCartControll,
  getCartItemController,
  updateCartQtyController,
} from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.post("/add", auth, addToCartController);
cartRouter.get("/get", auth, getCartItemController);
cartRouter.put("/updateQty", auth, updateCartQtyController);
cartRouter.delete("/deleteCartItem/:id", auth, deleteCartItem);
cartRouter.delete("/emptyCart/:id", auth, emptyCartControll);

export default cartRouter;
