const { productsRepo } = require("../implements/");
const Utils = require("../utils/");
module.exports = {
  newProduct: async ({ name, type, price, validate, lote, qtd }) => {
    const invalidparams = Utils.invalidParamsNumberAndString(
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
  getProduct: async (id, query) => {
    const { order, orderBy, exclude, include,filter } = query; //...data
    if(order && order != "DESC" && order != "ASC"){
      throw new Error("O order informado é invalido!")
    }
    var data = filter?.split(",")
    if(data){
      data = Utils.mapFilterQueryObject(data);
    }
    const list = id
      ? await productsRepo.findOne(id, exclude?.split(","))
      : await productsRepo.get({
          exclude: exclude?.split(","),
          include: include?.split(","),
          query: data,
          order,
          orderBy,
        });

    if (!list) {
      throw new Error("Não foi encontrado nenhum produto!");
    }
    return list;
  },
  updateProduct: async (id, data) => {
    const invalidParamsNull = Utils.invalidParams(data);
    if (invalidParamsNull.length > 0) {
      throw new Error(`Paramêtro ${invalidParamsNull.join(", ")} é inválido!`);
    }

    const invalidNumber = Utils.invalidNumberParams({ id });
    if (invalidNumber.length > 0) {
      throw new Error(
        `O paramêtro ${invalidNumber.join(", ")} deve ser um numero`
      );
    }

    const invalid = Utils.invalidParamsNumberAndString(
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
