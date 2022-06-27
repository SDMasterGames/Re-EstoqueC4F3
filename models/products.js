"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expirationIn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lote: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      qtd: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
