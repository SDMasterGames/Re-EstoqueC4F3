const { shopCartRepo } = require("../implements/");
const { invalidNumberIntegerParams } = require("../utils/");
module.exports = {
    getCart:async () =>{
        return await shopCartRepo.findAll()
    },
  addCart: async ({ id, qtd }) => {
    const invalid = invalidNumberIntegerParams(qtd);
    if (invalid.length > 0) {
      throw new Error("Paramêtros inválidos: " + invalid.join(", "));
    }

    const result = await shopCartRepo.create({ id, qtd });
    return result;
  },
  removeCart: async (id) => {
    const invalid = invalidNumberIntegerParams(qtd);
    if (invalid.length > 0) {
      throw new Error("Paramêtros inválidos: " + invalid.join(", "));
    }

    const [value] = await shopCartRepo.delete(id);
    if (value == 0) {
      throw new Error("Não encontrei o produto ou algo de errado não ta certo");
    }
    return { msg: "Removido com sucesso!" };
  },
};
