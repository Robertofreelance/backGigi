const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    genero: Gender!
    createdAt: String!
    role: Role!
    edad: Int!
    token: String!
  }

  type Role {
    id: ID!
    value: Float!
    name: String!
    permisos: [Permiso]
    createdAt: String!
  }

  enum Permiso {
    admin
    seller
  }

  enum Gender {
    Hombre
    Mujer
  }

  type Product {
    id: ID!
    value: Float!
    createdAt: String!
    name: String!
    stock: Int!
  }

  type Query {
    getProducts: [Product]
    getUsers: [User]!
    getRoles: [Role]!
  }

  input ProductInput {
    value: Float!
    name: String!
    stock: Int!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    genero: Gender!
    role: ID!
    edad: Int!
  }
  input UpdateUserInput {
    id: String!
    username: String
    password: String
    confirmPassword: String
    email: String
    genero: Gender
    role: ID
    edad: Int
  }
  input RoleInput {
    value: Float!
    name: String!
    permisos: [Permiso]
  }
  input ProductUpdate {
    productId: ID!
    value: Float
    name: String
    stock: Int
  }

  input RoleUpdate {
    roleId: ID!
    value: Float
    name: String
    permisos: [Permiso]
  }

  type Mutation {
    register(registerInput: RegisterInput!): User!
    login(email: String!, password: String!): User!
    updateUser(updateUserInput: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
    createProduct(productInput: ProductInput!): Product!
    updateProduct(productInput: ProductUpdate!): Product!
    deleteProduct(productId: ID!): Product!
    createRole(roleInput: RoleInput!): Role!
    updateRole(roleInput: RoleUpdate!): Role!
    deleteRole(roleId: ID!): Role!
  }
`;
