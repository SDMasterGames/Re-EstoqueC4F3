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

router.post("/", async (req, res) => {
  try {
    const { id, qtd } = req.body;
    const result = await shopcart.addCart({
      id,
      qtd,
    });
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send({
      error: error.message || "Erro inesperado ocorreu",
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { id } = req.query;
    const result = await shopcart.removeProductCart(id);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({
      error: error.message || "Erro inesperado ocorreu",
    });
  }
});

router.delete("/clear", async (req, res) => {
  try {
    const result = await shopcart.deleteCart();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({
      error: error.message || "Erro inesperado ocorreu",
    });
  }
});

module.exports = (app) => app.use("/cart", router);
