const { Router } = require("express");

const { products } = require("../useCases");
const authMiddleware = require("../middleware/auth");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { id, ...query } = req.query;
    const result = await products.getProduct(id, query);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({
      error: error.message || "Algum erro inesperado ocorreu!",
    });
  }
});

router.use(authMiddleware);

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await products.updateProduct(id, data);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({
      error: error.message || "Algum erro inesperado ocorreu!",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, type, price, validate, lote, qtd } = req.body;
    const result = await products.newProduct({
      name,
      type,
      lote,
      price,
      qtd,
      validate,
    });

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).send({
      error: error.message || "Algum erro inesperado ocorreu!",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await products.deleteProduct(id);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({
      error: error.message || "Algum erro inesperado ocorreu!",
    });
  }
});

module.exports = (app) => app.use("/storage", router);
