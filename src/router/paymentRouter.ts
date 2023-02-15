import express from "express";
import { PaymentController } from "../controller/paymentController";

export const paymentRouter = express.Router();

const paymentController = new PaymentController();

paymentRouter.get("/:userId/:productIds", paymentController.getPayments);
