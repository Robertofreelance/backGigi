const { UserInputError } = require("apollo-server-express");
const Products = require("../../models/Products");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getProducts(_, __, context) {
      try {
        checkAuth(context);

        const products = Products.find();
        return products;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createProduct(_, { productInput: { value, name, stock } }, context) {
      const user = checkAuth(context);
      if (!user.role.permisos.includes("seller")) {
        throw new UserInputError(
          "Usted no esta autorizado para eliminar el producto",
          {
            errors: {
              product: "Usted no esta autorizado para eliminar el producto",
            },
          }
        );
      }
      let errors = {};
      if (value === 0) {
        errors.value = "Se le debe asignar la cantidad a pagar al rol";
      }
      if (name === "") {
        errors.name = "Se le debe dar un nombre al rol";
      }
      if (stock === 0) {
        errors.stock =
          "Al crear un producto debe tener al menos uno en inventario";
      }
      if (Object.keys(errors).length > 0) {
        throw new UserInputError("Hubo un error en la creación del producto", {
          errors,
        });
      }

      const newProduct = new Products({
        value,
        name,
        stock,
        createdAt: new Date().toISOString(),
      });

      const res = await newProduct.save();

      return {
        ...res._doc,
        id: res._id,
      };
    },
    async updateProduct(
      _,
      { productInput: { productId, value, name, stock } },
      context
    ) {
      const user = checkAuth(context);
      if (!user.role.permisos.includes("seller")) {
        throw new UserInputError(
          "Usted no esta autorizado para eliminar el producto",
          {
            errors: {
              product: "Usted no esta autorizado para eliminar el producto",
            },
          }
        );
      }
      // Validate user data
      const Product = await Products.findById(productId);

      if (!Product) {
        throw new UserInputError("No se ha encontrado el producto", {
          errors: {
            producteId: "No se ha encontrado el producto",
          },
        });
      }

      if (name && name !== "") {
        Product.name = name;
      }
      if (value && value !== 0) {
        Product.value = value;
      }
      if (stock && stock !== 0) {
        Product.stock = stock;
      }

      const res = await Product.save();

      return {
        ...res._doc,
        id: res._id,
      };
    },
    async deleteProduct(_, { productId }, context) {
      const user = checkAuth(context);
      if (!user.role.permisos.includes("seller")) {
        throw new UserInputError(
          "Usted no esta autorizado para eliminar el producto",
          {
            errors: {
              product: "Usted no esta autorizado para eliminar el producto",
            },
          }
        );
      }
      const product = await Products.findById(productId);
      if (!product) {
        throw new UserInputError("No se ha encontrado el producto a eliminar", {
          errors: {
            productId: "No se ha encontrado el producto a eliminar",
          },
        });
      }
      const info = product;

      await product.delete();

      return info;
    },
  },
};
