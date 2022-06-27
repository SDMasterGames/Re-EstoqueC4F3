const { sequelize } = require("../../models/");

const { shopcart } = sequelize.models;

module.exports = {
  create: async ({ id, qtd }) => {
    const product = await shopcart.create({
      id,
      qtd,
    });
    return product;
  },
  delete: async (id) => {
    const product = await shopcart.destroy({
      where: {
        id,
      },
    });
    return product;
  },

  findAll: async () => {
    const list = await shopcart.findAll({});
    return list;
  },
};
