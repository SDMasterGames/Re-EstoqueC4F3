const { shopCartRepo, productsRepo } = require("../implements/");
const { invalidNumberIntegerParams } = require("../utils/");
module.exports = {
  getCart: async () => {
    return await shopCartRepo.findAll();
  },
  addCart: async ({ id, qtd }) => {
    const invalid = invalidNumberIntegerParams(qtd);
    if (invalid.length > 0) {
      throw new Error("Paramêtros inválidos: " + invalid.join(", "));
    }

    const isExistProduct = await productsRepo.findOne(id);

    if (!isExistProduct) {
      throw new Error("O produto informado não existe!");
    }

    const result = await shopCartRepo.create({ id, qtd });
    return result;
  },
  removeProductCart: async (id) => {
    const invalid = invalidNumberIntegerParams({ id });
    if (invalid.length > 0) {
      throw new Error("Paramêtros inválidos: " + invalid.join(", "));
    }

    const value = await shopCartRepo.delete(id);
    if (value == 0) {
      throw new Error("Não encontrei o produto ou algo de errado não ta certo");
    }
    return { msg: "Removido com sucesso!" };
  },
  deleteCart: async () => {
    const result = await shopCartRepo.deleteAll();
    return { msg: "Deletado com sucesso todo o carrinho!" };
  },
};
