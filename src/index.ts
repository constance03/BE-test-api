import express from "express";
import cors from "cors";
import { userRouter } from "./router/userRouter";
import { productRouter } from "./router/productRouter";
import { paymentRouter } from "./router/paymentRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/payment", paymentRouter);
