const App = require("./app");

const server = new App()

const PORT = process.env["PORT"] || 3000;

server.listen(PORT);
