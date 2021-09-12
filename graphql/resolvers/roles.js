const { UserInputError } = require("apollo-server-express");
const Roles = require("../../models/Roles");
const Users = require("../../models/Roles");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getRoles(_, __, context) {
      try {
        checkAuth(context);

        const roles = Roles.find();
        return roles;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createRole(_, { roleInput: { value, name, permisos } }) {
      let errors = {};
      if (value === 0) {
        errors.value = "Se le debe asignar la cantidad a pagar al rol";
      }
      if (name === "") {
        errors.name = "Se le debe dar un nombre al rol";
      }

      if (Object.keys(errors).length > 0) {
        throw new UserInputError("Hubo un error en la creación del rol", {
          errors,
        });
      }

      const newRole = new Roles({
        value,
        name,
        permisos,
        createdAt: new Date().toISOString(),
      });

      const res = await newRole.save();

      return {
        ...res._doc,
        id: res._id,
      };
    },
    async updateRole(_, { roleInput: { roleId, name, permisos, value } }) {
      // Validate user data
      const Role = await Roles.findById(roleId);

      if (!Role) {
        throw new UserInputError("No se ha encontrado el rol", {
          errors: {
            roleId: "No se ha encontrado el rol",
          },
        });
      }

      if (name && name !== "") {
        Role.name = name;
      }
      if (value && value !== 0) {
        Role.value = value;
      }
      if (permisos) {
        Role.permisos = permisos;
      }

      const res = await Role.save();

      return {
        ...res._doc,
        id: res._id,
      };
    },
    async deleteRole(_, { roleId }, context) {
      const user = checkAuth(context);
      if (!user.role.permisos.includes("admin")) {
        throw new UserInputError(
          "Usted no esta autorizado para eliminar el rol",
          {
            errors: {
              role: "Usted no esta autorizado para eliminar el rol",
            },
          }
        );
      }
      const role = await Roles.findById(roleId);
      if (!role) {
        throw new UserInputError("No se ha encontrado el rol a eliminar", {
          errors: {
            rolId: "No se ha encontrado el rol a eliminar",
          },
        });
      }
      const existingOnUsers = await Users.find({ role: roleId });
      if (existingOnUsers.length > 0) {
        throw new UserInputError(
          "No se puede eliminar un rol mientras tenga usuarios asignados",
          {
            errors: {
              role: "No se puede eliminar un rol mientras tenga usuarios asignados",
            },
          }
        );
      }

      const info = role;

      await role.delete();

      return info;
    },
  },
};
