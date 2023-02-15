import { Request, Response } from "express";
import request from "request";
import { BaseError } from "../errors/BaseError";

export class PaymentController {
  
  // request to get one or several product prices by id and calculate how much the user is
  // going to pay, according to the user tax found by id
  public getPayments = (req: Request, res: Response) => {
    try {
      const productIds = req.params.productIds.split(",");
      const userId = req.params.userId;

      const userEndpoint = `https://mockend.com/juunegreiros/BE-test-api/users/${userId}`;

      request(userEndpoint, (error, response, userBody) => {
        if (!error && response.statusCode == 200) {
          const user = JSON.parse(userBody);

          const paymentPromises = productIds.map((id) => {
            return new Promise((resolve, reject) => {
              const productEndpoint = `https://mockend.com/juunegreiros/BE-test-api/products/${id}`;

              request(productEndpoint, (error, response, productBody) => {
                if (!error && response.statusCode == 200) {
                  const product = JSON.parse(productBody);

                  resolve({
                    id: product.id,
                    payment: product.price * (1 + user.tax),
                  });
                } else {
                  reject(`Error fetching product with ID ${id}`);
                }
              });
            });
          });

          Promise.all(paymentPromises)
            .then((payments) => res.send({ payments }))
            .catch((error) => res.send(error));
        } else {
          res.send(`Error fetching user with ID ${userId}`);
        }
      });
    } catch (error) {
      console.log(error);
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
