const jwt = require("jsonwebtoken");
const { Unauthenticated, NotFound } = require("../error");

const JWT_SECRET = 'JEWEL-SECRET-KEY';

exports.signToken = (data) => {
    return jwt.sign({ ...data }, JWT_SECRET, { expiresIn: '1h' });

}

exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);

};
