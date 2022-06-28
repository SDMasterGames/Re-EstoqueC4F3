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

  get: async (query = {}, order = "DESC", orderBy = "qtd") => {
    const {search,...data} = query
    const list = await products.findAll({
      order: [[orderBy, order]],
      where: {
        [Op.and]: [{ ...data },{
          name:{
            [Op.startsWith]:search || ""
          }
        }],
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
