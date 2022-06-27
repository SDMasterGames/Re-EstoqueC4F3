const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: "Erro - Sem Token" });

  const parts = authHeader.split(" ");

  if (parts.length != 2)
    return res.status(401).send({ error: "Erro - no Token" });

  const [scheme, token] = parts;

  if (scheme != "Bearer")
    return res.status(401).send({ error: "Erro - Mal Formatado" });

  jwt.verify(token, process.env["PRIVATE_AUTH_KEY"], (err, decoded) => {
    if (err) return res.status(401).send({ error: "Token Invalido!" });
    req.id = decoded.id;
    return next();
  });
};
