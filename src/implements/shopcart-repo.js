const { sequelize } = require("../../models/");

const { shopcart, products } = sequelize.models;

module.exports = {
  create: async ({ id, qtd }) => {
    const product = await shopcart.create({
      productId: id,
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
    const list = await shopcart.findAll({
      include: "product",
    });
    return list;
  },

  deleteAll: async () => {
    const chart = await shopcart.destroy({ truncate: true });
    console.log(chart);
    return chart;
  },
};
