import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  addToMyList,
  deleteToMyList,
  getMyListController,
} from "../controllers/myListController.js";

const myListRouter = Router();

myListRouter.post("/add", auth, addToMyList);
myListRouter.get("/get", auth, getMyListController);
myListRouter.delete("/:id", auth, deleteToMyList);

export default myListRouter;
