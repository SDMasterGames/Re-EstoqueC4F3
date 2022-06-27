const { Router } = require("express");
const { users } = require("../useCases");
const router = Router();

router.post("/register", async (req, res) => {
  try {
    const result = await users.register(req.body);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({
      error: error.message || "Algo inesperado ocorreu!",
    });
  }
});

router.post("/auth", async (req, res) => {
  try {
    const { login, password } = req.body;
    const result = await users.auth(login, password);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({
      error: error.message || "Algo inesperado ocorreu!",
    });
  }
});

router.get("/validate/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const result = await users.validateToken(token);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({
      error: error.message || "Algo inesperado ocorreu!",
    });
  }
});

module.exports = (app) => app.use("/user", router);
