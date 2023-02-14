const customExpress = require("./src/config/customExpress");

const app = customExpress();

app.listen(3000, () => {
  console.log("Server on port 3000");
});

module.exports = app;
