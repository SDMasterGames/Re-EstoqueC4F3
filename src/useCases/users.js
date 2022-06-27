const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { usersRepo } = require("../implements/");
const { invalidParams } = require("../utils/");

const private_key = process.env["PRIVATE_AUTH_KEY"];

module.exports = {
  register: async ({ name, username, email, password, confirmPass }) => {
    const invalid = invalidParams({
      name,
      username,
      email,
      password,
      confirmPass,
    });
    if (invalid.length > 0) {
      throw new Error(`Paramêtro ${invalid.join(", ")} é inválido!`);
    }

    if (password !== confirmPass) {
      throw new Error("As senhas não se coincide!");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = await usersRepo.create({
      name,
      username,
      email,
      password: hash,
    });

    if (!user) {
      throw new Error("Usuário já cadastrado!");
    }
    const token = JWT.sign({ id: user.id }, private_key, {
      expiresIn: "1h",
    });

    return { user, token };
  },

  auth: async (login, password) => {
    const invalid = invalidParams({
      password,
      login,
    });
    if (invalid.length > 0) {
      throw new Error(`Paramêtro ${invalid.join(", ")} é inválido!`);
    }
    const user = await usersRepo.findOne(login);
    if (!user) {
      throw new Error("Esse usuário não existe!");
    }

    const validate = bcrypt.compareSync(password, user.password);
    if (!validate) throw new Error("Senha incorreta!");
    const token = JWT.sign({ id: user.id }, private_key, {
      expiresIn: "1h",
    });
    return { user, token };
  },

  validateToken: async (token) => {
    const decoded = JWT.verify(token, private_key);
    const user = await usersRepo.findById(decoded.id);
    return { user, token };
  },
};
