"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class shopcart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.shopcart.belongsTo(models.products, {
        foreignKey: {
          name: "productId",
          allowNull: false,
        },
        onDelete: 'RESTRICT',
      });
    }
  }
  shopcart.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      qtd: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "shopcart",
    }
  );
  return shopcart;
};
