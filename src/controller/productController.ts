import { Request, Response } from "express";
import request from "request";
import { BaseError } from "../errors/BaseError";

export class ProductController {

    // requests to get all products and a product using the id
  public getProducts = (req: Request, res: Response) => {
    try {
      request(
        "https://mockend.com/juunegreiros/BE-test-api/products",
        (error, response, body) => {
          if (!error && response.statusCode == 200) {
            res.send(body);
          } else {
            res.send("Error fetching products");
          }
        }
      );
    } catch (error) {
      console.log(error);
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public getProductById = (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      request(
        `https://mockend.com/juunegreiros/BE-test-api/products/${id}`,
        (error, response, body) => {
          if (!error && response.statusCode == 200) {
            res.send(body);
          } else {
            res.send(`Error fetching product with ID ${id}`);
          }
        }
      );
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
