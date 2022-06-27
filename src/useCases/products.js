const { productsRepo } = require("../implements/");
const {
  invalidNumberParams,
  invalidParams,
  invalidParamsNumberAndString,
} = require("../utils/");
module.exports = {
  newProduct: async ({ name, type, price, validate, lote, qtd }) => {
    const invalidparams = invalidParamsNumberAndString(
      ["price", "lote", "qtd"],
      { name, type, price, validate, lote, qtd }
    );
    if (invalidparams.length > 0) {
      throw new Error(`O paramêtro ${invalidparams.join(", ")} é inválido`);
    }
    const product = await productsRepo.add({
      name,
      type,
      price,
      validate,
      lote,
      qtd,
    });

    if (!product) {
      throw new Error("Item já existe ou algo de errado não ta certo");
    }

    return product;
  },
  getProduct: async (id,query) => {
    const list = id
      ? await productsRepo.findOne(id)
      : await productsRepo.get(query);

    if (!list) {
      throw new Error("Não foi encontrado nenhum produto!");
    }
    return list;
  },
  updateProduct: async (id, data) => {
    const invalidParamsNull = invalidParams(data);
    if (invalidParamsNull.length > 0) {
      throw new Error(`Paramêtro ${invalidParamsNull.join(", ")} é inválido!`);
    }

    const invalidNumber = invalidNumberParams({ id });
    if (invalidNumber.length > 0) {
      throw new Error(
        `O paramêtro ${invalidNumber.join(", ")} deve ser um numero`
      );
    }

    const invalid = invalidParamsNumberAndString(
      ["price", "lote", "qtd"],
      data
    );
    if (invalid.length > 0) {
      throw new Error(
        `os seguintes paramêtros são inválidos: ${invalid.join(", ")}`
      );
    }
    const update = await productsRepo.update(id, data);

    if (update.includes(0)) {
      throw new Error("Item não existe ou algo de errado não ta certo");
    }

    return { msg: "Produto atualizado com sucesso!" };
  },
  deleteProduct: async (id) => {
    const result = await productsRepo.delete(id);
    if (result == 0) {
      throw new Error("Item não existe ou algo de errado não ta certo");
    }
    return { msg: "Produto removido com sucesso!" };
  },
};
