const { Router } = require("express");

const { shopcart } = require("../useCases/");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await shopcart.getCart();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({
      error: error.message || "Erro inesperado ocorreu.",
    });
  }
});

module.exports = (app) => app.use("/cart", router);
