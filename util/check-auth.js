const { AuthenticationError } = require('apollo-server-express');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

module.exports = (context) => {
  const authHeader = context.headers.authorization;
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const data = jwt.verify(token, SECRET_KEY);
        return data;
      } catch (err) {
        throw new AuthenticationError('Sesión invalida/expirada');
      }
    }
    throw new AuthenticationError("Usted no ha iniciado sesión");
  }
  throw new AuthenticationError('Usted no ha iniciado sesión');
};
