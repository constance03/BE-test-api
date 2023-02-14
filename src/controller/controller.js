const request = require("request");

module.exports = (app) => {
  // request to get all users
  app.get("/users", (req, res) => {
    request(
      "https://mockend.com/juunegreiros/BE-test-api/users",
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          res.send(body);
        } else {
          res.send("Error fetching users");
        }
      }
    );
  });

  // request to get an user by id
  app.get("/users/:id", (req, res) => {
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
  });

  // request to get a product
  app.get("/products", (req, res) => {
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
  });

  // request to get a product by id
  app.get("/products/:id", (req, res) => {
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
  });

  // request to get one or several product prices by id and calculate how much the user is
  // going to pay, according to the user tax found by id
  app.get("/payment/:userId/:productIds", (req, res) => {
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
  });
};
