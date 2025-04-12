import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  createOrderController,
  getOrderDetailsController,
  updateOrderStatus,
} from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.post("/create", auth, createOrderController);
orderRouter.get("/order-list", auth, getOrderDetailsController);
orderRouter.put("/orderStatus/:id", auth, updateOrderStatus);
export default orderRouter;
