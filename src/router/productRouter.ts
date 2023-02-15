import express from "express";
import { ProductController } from "../controller/productController";

export const productRouter = express.Router();

const productController = new ProductController();

productRouter.get("/", productController.getProducts);
productRouter.get("/:id", productController.getProductById);
