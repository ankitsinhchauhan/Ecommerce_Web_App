import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  createOrderController,
  getOrderDetailsController,
  getTotalOrdersCountController,
  totalSalesController,
  totalUsersController,
  updateOrderStatus,
} from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.post("/create", auth, createOrderController);
orderRouter.get("/order-list", auth, getOrderDetailsController);
orderRouter.put("/orderStatus/:id", auth, updateOrderStatus);
orderRouter.get("/count", getTotalOrdersCountController);

orderRouter.get("/users", auth, totalUsersController);
orderRouter.get("/sales", auth, totalSalesController);
export default orderRouter;
