const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server-express");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");
const Roles = require("../../models/Roles");
const checkAuth = require("../../util/check-auth");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: "30d" }
  );
}

module.exports = {
  Query: {
    async getUsers(_, __, context) {
      try {
        const userAuth = checkAuth(context);
        if (!userAuth.role.permisos.includes("admin")) {
          throw new UserInputError(
            "No estas autorizado para realizar esta acción",
            {
              errors: {
                permisos: "No estas autorizado para realizar esta acción",
              },
            }
          );
        }
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async login(_, { email, password }) {
      const { errors, valid } = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user) {
        errors.general = "Usuario no encontrado";
        throw new UserInputError("Usuario no encontrado", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Contraseña incorrecta";
        throw new UserInputError("Contraseña incorrecta", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      {
        registerInput: {
          username,
          email,
          password,
          confirmPassword,
          role,
          edad,
          genero,
        },
      }
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword,
        genero,
        edad
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // TODO: Make sure user doesnt already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Este nombre ya se encuentra registrado", {
          errors: {
            username: "Este nombre ya se encuentra registrado",
          },
        });
      }
      // TODO: Make sure user doesnt already exist
      const uniqueEmail = await User.findOne({ email });
      if (uniqueEmail) {
        throw new UserInputError("Ya te has registrado con este correo", {
          errors: {
            username: "Ya te has registrado con este correo",
          },
        });
      }
      const existRole = await Roles.findById(role);
      if (!existRole) {
        throw new UserInputError("El rol es invalido", {
          errors: {
            role: "El rol es invalido",
          },
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email: email.toLowerCase(),
        username,
        password,
        edad,
        genero,
        role,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async updateUser(
      _,
      {
        updateUserInput: {
          id,
          username,
          email,
          password,
          confirmPassword,
          role,
          edad,
          genero,
        },
      },
      context
    ) {
      const admin = checkAuth(context);
      if (!admin.role.permisos.includes("admin")) {
        throw new UserInputError(
          "Usted no esta autorizado para eliminar el rol",
          {
            errors: {
              role: "Usted no esta autorizado para eliminar el rol",
            },
          }
        );
      }
      const user = await User.findById(id);
      if (!user) {
        throw new UserInputError("Este usuario no existe", {
          errors: {
            user: "Este usuario no existe",
          },
        });
      }
      if (username.trim() !== "") {
        if (username.split(" ").length > 1) {
          user.username = username;
        } else {
          throw new UserInputError("El nombre de usuario es invalido", {
            errors: {
              username: "El nombre de usuario es invalido",
            },
          });
        }
      }
      if (role !== "") {
        const existRole = await Roles.findById(role);
        if (!existRole) {
          throw new UserInputError("El rol es invalido", {
            errors: {
              role: "El rol es invalido",
            },
          });
        }
        user.role = role;
      }
      if (password.trim() !== "") {
        if (password.trim() !== "" && password === confirmPassword) {
          // hash password and create an auth token
          user.password = await bcrypt.hash(password, 12);
        } else {
          throw new UserInputError("Las contraseñas no coinciden", {
            errors: {
              password: "Las contraseñas no coinciden",
            },
          });
        }
      }
      if (edad) {
        if (edad < 10 || edad > 110) {
          throw new UserInputError(
            "Ha ingresado una edad invalida para un usuario",
            {
              errors: {
                edad: "Ha ingresado una edad invalida para un usuario",
              },
            }
          );
        }
        user.edad = edad;
      }

      if (email.trim() !== "") {
        const regEx =
          /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (email.trim() !== "" && email.match(regEx)) {
          user.email = email;
        } else {
          throw new UserInputError("El email es invalido", {
            errors: {
              email: "El email es invalido",
            },
          });
        }
      }
      const res = await user.save();

      return {
        ...res._doc,
        id: res._id,
      };
    },
    async deleteUser(_, { id }, context) {
      const admin = checkAuth(context);
      if (!admin.role.permisos.includes("admin")) {
        throw new UserInputError(
          "Usted no esta autorizado para eliminar el rol",
          {
            errors: {
              role: "Usted no esta autorizado para eliminar el rol",
            },
          }
        );
      }
      const user = await User.findById(id);
      if (!user) {
        throw new UserInputError("No se ha encontrado el rol a eliminar", {
          errors: {
            rolId: "No se ha encontrado el rol a eliminar",
          },
        });
      }
      const info = user;

      await user.delete();

      return info;
    },
  },
};
