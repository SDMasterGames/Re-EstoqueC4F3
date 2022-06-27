const { sequelize } = require("../../models");

const { users } = sequelize.models;

module.exports = {
  create: async (data) => {
    const [user, created] = await users.findOrCreate({
      where: {
        username: data.username,
        email: data.email,
      },
      defaults: data,
    });

    if (!created) {
      return null;
    }
    return user;
  },

  findOne: async (username) => {
    const user = await users.findOne({
      where: {
        username,
      },
    });
    return user;
  },
  findById: async (id) => {
    return await users.findOne({
      where: { id },
    });
  },
};
