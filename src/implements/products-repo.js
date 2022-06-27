const { Op } = require("sequelize");
const { sequelize } = require("../../models");

const products = sequelize.models.products;

module.exports = {
  add: async ({ name, type, price, validate, lote, qtd }) => {
    const [product, created] = await products.findOrCreate({
      where: { name },
      defaults: {
        type,
        price,
        expirationIn: validate,
        lote,
        qtd,
      },
    });

    if (!created) {
      return null;
    }

    return product;
  },

  get: async (query = {}) => {
    const list = await products.findAll({
      where: {
        [Op.and]:[query]
      },
    });
    return list;
  },

  update: async (id, data) => {
    const product = await products.update(data, {
      where: {
        id,
      },
    });
    return product;
  },
  findOne: async (id) => {
    const product = await products.findOne({
      where: { id },
    });

    return product;
  },

  delete: async (id) => {
    const product = await products.destroy({
      where: { id },
    });
    return product;
  },
};
