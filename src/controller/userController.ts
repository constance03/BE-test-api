import request from "request";
import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";

export class UserController {

    // requests to get all users and an user using the id
  public getUsers = (req: Request, res: Response) => {
    try {
      request(
        "https://mockend.com/juunegreiros/BE-test-api/users",
        (error, response, body) => {
          if (!error && response.statusCode == 200) {
            res.status(200).send(body);
          } else {
            res.send("Error fetching users");
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

  public getUserById = (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      request(
        `https://mockend.com/juunegreiros/BE-test-api/users/${id}`,
        (error, response, body) => {
          if (!error && response.statusCode == 200) {
            res.send(body);
          } else {
            res.send(`Error fetching user with ID ${id}`);
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
