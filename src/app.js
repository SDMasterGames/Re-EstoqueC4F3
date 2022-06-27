const express = require("express");
const Routes = require("./routes");

module.exports = class App {
  constructor() {
    this.app = express();
    this.initMiddleware()
    this.initRoutes()
  }
  initMiddleware() {
    this.app.use(express.json());
  }

  initRoutes() {
    Routes(this.app);
  }

  listen(port) {
    this.app.listen(port, () => console.log("Server running in " + port));
  }
};
