const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    msg: "Bem-vindo a Api do Estoque",
  });
});

module.exports = (app) => app.use(router);
