const usersResolver = require("./users");
const productsResolver = require("./products");
const rolesResolver = require("./roles");

module.exports = {
  Query: {
    ...usersResolver.Query,
    ...productsResolver.Query,
    ...rolesResolver.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...productsResolver.Mutation,
    ...rolesResolver.Mutation,
  },
};
