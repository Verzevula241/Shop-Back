const jwt = require("jsonwebtoken");
const config = require("../auth.config.js");



verToken = (req, res, next) => {
  let token = req.body.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.refresh, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};
const verifyToken = {
  verToken
};
module.exports = verifyToken;