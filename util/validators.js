const { ciudades } = require("../config");
const { isEmail, isMobilePhone, isURL, isEmpty } = require("validator");

module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword,
  genero,
  edad
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "El nombre no debe estar vacio";
  } else {
    if (username.split(" ").length < 2) {
      errors.username = "El nombre debe estar completo";
    }
  }
  if (genero.trim() !== "Hombre" && genero.trim() !== "Mujer") {
    errors.genero = 'El genero tiene que ser "Hombre" o "Mujer"';
  }
  if (edad < 10 || edad > 110) {
    errors.edad = "Ha ingresado una edad invalida para un usuario";
  }
  if (!ciudades.includes(ciudad)) {
    errors.ciudad = "La ciudad no es valida";
  }
  if (email.trim() === "") {
    errors.email = "El correo no debe estar vacio";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "El correo debe ser valido";
    }
  }
  if (password === "") {
    errors.password = "La contraseña no debe estar vacia";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Las contraseñas deben coincidir";
  }
  if (!isEmpty(telefono)) {
    if (!isMobilePhone(telefono)) {
      errors.telefono = "El valor ingresado tiene que ser un numero de celular";
    }
  } else {
    errors.telefono = "Se debe ingresar un numero telefonico";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "El nombre no debe estar vacio";
  } else {
    if (username.split(" ").length < 2) {
      errors.username = "El nombre debe estar completo";
    }
  }
  if (email.trim() === "") {
    errors.email = "El correo no debe estar vacio";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "El correo debe ser valido";
    }
  }
  if (password === "") {
    errors.password = "La contraseña no debe estar vacia";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Las contraseñas deben coincidir";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "El nombre no debe estar vacio";
  } else {
    if (username.split(" ").length < 2) {
      errors.username = "El nombre debe estar completo";
    }
  }
  if (email.trim() === "") {
    errors.email = "El correo no debe estar vacio";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "El correo debe ser valido";
    }
  }
  if (password === "") {
    errors.password = "La contraseña no debe estar vacia";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Las contraseñas deben coincidir";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateUploadInput = (someData) => {
  const errors = {};
  if (isEmpty(someData.precio)) {
    errors.precio =
      "No ha introducido ningun precio o ha introducido un valor erroneo";
  }
  if (isEmpty(someData.nombre)) {
    errors.nombre = "No ha ingresado ningun nombre";
  }
  if (isEmpty(someData.descripcion)) {
    errors.descripcion = "No ha ingresado ninguna descripcion";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "El correo no debe estar vacio";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "El correo debe ser valido";
    }
  }
  if (password.trim() === "") {
    errors.password = "La contraseña no debe estar vacia";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
module.exports.validateEstablecimientoInput = (
  name,
  password,
  confirmPassword,
  contacto,
  email,
  ciudad,
  descripcion,
  ubicacion,
  restriccion,
  categoria,
  reservas,
  correo,
  personaCargo,
  NIT,
  empresa,
  celular
) => {
  const errors = {};

  if (name.trim() === "") {
    errors.name = "El nombre no debe estar vacio";
  }
  if (!isEmail(correo)) {
    errors.correo = "No ha ingresado el correo para facturación";
  }
  if (isEmpty(personaCargo)) {
    errors.personaCargo = "No ha ingresado a la persona a cargo";
  }
  if (isEmpty(NIT)) {
    errors.NIT = "No ha ingresado el NIT de su empresa";
  }
  if (isEmpty(empresa)) {
    errors.empresa = "No ha ingresado el nombre de la empresa";
  }
  if (!isMobilePhone(celular)) {
    errors.celular = "No ha ingresado un celular valido para facturación";
  }

  if (descripcion.trim() === "") {
    errors.descripcion = "No ha brindado la descripcion de su establecimiento";
  }
  if (Object.keys(ubicacion).length === 0) {
    errors.ubicacion = "No ha brindado la ubicación del establecimiento";
  } else {
    Object.values(ubicacion).forEach((ubc) => {
      if (!isURL(ubc)) {
        errors.ubicacion =
          "No se ha ingresado ningun link en alguna de las direcciones";
      }
    });
  }
  if (!ciudades.includes(ciudad)) {
    errors.ciudad = "La ciudad no es valida";
  }
  Object.keys(contacto).forEach((contact) => {
    switch (contact) {
      case "Facebook":
        if (
          !contacto[contact].match(
            /(?:https?:\/\/)?(?:www\.)?facebook\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/
          )
        ) {
          errors.contacto =
            "La URL o numero de alguno de los valores ingresados en contactos es erroneo, verifique si las URLS son de su perfil de facebook, instagram o verifique si el numero telefonico es correcto";
        }
        break;
      case "Instagram":
        if (
          !contacto[contact].match(
            /(?:https?:)?\/\/(?:www\.)?(?:instagram\.com|instagr\.am)\/([a-z]{1}).*/
          )
        ) {
          errors.contacto =
            "La URL o numero de alguno de los valores ingresados en contactos es erroneo, verifique si las URLS son de su perfil de facebook, instagram o verifique si el numero telefonico es correcto";
        }
        break;
      case "Whatsapp":
      case "Celular":
        if (!isMobilePhone(contacto[contact])) {
          errors.contacto =
            "La URL o numero de alguno de los valores ingresados en contactos es erroneo, verifique si las URLS son de su perfil de facebook, instagram o verifique si el numero telefonico es correcto";
        }
        break;
      default:
        errors.contacto = "Ha ocurrido un error";
        break;
    }
  });
  if (!isEmail(email)) {
    errors.email = "El correo debe ser valido";
  }
  if (password === "") {
    errors.password = "La contraseña no debe estar vacia";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Las contraseñas deben coincidir";
  }
  if (restriccion) {
    if (restriccion.Perzonalizada) {
      if (restriccion.Personalizada.nombre.trim() === "") {
        errors.restriccion =
          "No ha brindado el nombre de la restricción personalizada";
      }
    }
  }
  if (categoria) {
    if (categoria.length > 3) {
      errors.categoria = "Solo se puede ingresar un maximo de 3 categorias";
    }
  }
  if (reservas.avaiable) {
    if (reservas.days.length > 6) {
      errors.days = "Ha superado el maximo de dias no laborales";
    }
    if (reservas.days.length > 0) {
      reservas.days.forEach((val) => {
        if (!days.includes(val)) {
          errors.days = "Ha ingresado un valor invalido";
        }
      });
    }
  } else {
    if (reservas.days > 0) {
      errors.reservas =
        "Ha infringido una violación a nuestro sistema de reservas";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateEstablecimientoInputUpdate = ({
  name,
  contacto,
  ciudad,
  descripcion,
  ubicacion,
  reservas,
}) => {
  const errors = {};

  const urlRegex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  if (name) {
    if (name.trim() === "") {
      errors.name = "El nombre no debe estar vacio";
    }
  }
  if (descripcion) {
    if (descripcion.trim() === "") {
      errors.descripcion =
        "No ha brindado la descripcion de su establecimiento";
    }
  }
  if (ubicacion) {
    if (ubicacion.trim === "") {
      errors.ubicacion = "No ha brindado la ubicación del establecimiento";
    }
  }
  if (ciudad) {
    if (!ciudades.includes(ciudad)) {
      errors.ciudad = "La ciudad no es valida";
    }
  }
  if (contacto) {
    Object.keys(contacto).forEach((contact) => {
      switch (contact) {
        case "Facebook":
          if (
            !contacto[contact].match(
              /(?:https?:\/\/)?(?:www\.)?facebook\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/
            )
          ) {
            errors.contacto =
              "La URL o numero de alguno de los valores ingresados en contactos es erroneo, verifique si las URLS son de su perfil de facebook, instagram o verifique si el numero telefonico es correcto";
          }
          break;
        case "Instagram":
          if (
            !contacto[contact].match(
              /(?:https?:)?\/\/(?:www\.)?(?:instagram\.com|instagr\.am)\/([a-z]{1}).*/
            )
          ) {
            errors.contacto =
              "La URL o numero de alguno de los valores ingresados en contactos es erroneo, verifique si las URLS son de su perfil de facebook, instagram o verifique si el numero telefonico es correcto";
          }
          break;
        case "Whatsapp":
        case "Celular":
          if (!isMobilePhone(contacto[contact])) {
            errors.contacto =
              "La URL o numero de alguno de los valores ingresados en contactos es erroneo, verifique si las URLS son de su perfil de facebook, instagram o verifique si el numero telefonico es correcto";
          }
          break;
        default:
          errors.contacto = "Ha ocurrido un error";
          break;
      }
    });
  }
  if (reservas) {
    const days = [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo",
    ];
    if (reservas.avaiable) {
      if (reservas.days.length > 6) {
        errors.days = "Ha superado el maximo de dias no laborales";
      }
      if (reservas.days.length > 0) {
        reservas.days.forEach((val) => {
          if (!days.includes(val)) {
            errors.days = "Ha ingresado un valor invalido";
          }
        });
      }
    } else {
      if (reservas.days > 0) {
        errors.reservas =
          "Ha infringido una violación a nuestro sistema de reservas";
      }
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
module.exports.validateSubscriptionInput = (
  name,
  document,
  city,
  fecha,
  line1,
  phone,
  number
) => {
  const errors = {};
  if (isEmpty(name)) {
    errors.name = "El nombre del tarjeta habitante no debe estar vacio";
  }
  if (isEmpty(document)) {
    errors.document =
      "El documento de identidad del tarjeta habitante no debe estar vacio";
  }
  if (!ciudades.includes(city)) {
    errors.city = "La ciudad es invalida";
  }
  if (!fecha.match(/(((0)[0-9])|((1)[0-2]))(\/)(\d{4}|\d{2})$/)) {
    errors.nexpMonthame = "La fecha de vencimiento es invalida";
  }

  if (isEmpty(line1)) {
    errors.line1 = "La dirección no debe estar vacia";
  }
  if (!isMobilePhone(phone)) {
    errors.phone = "El numero de telefono es invalido";
  }
  if (isEmpty(number)) {
    errors.number = "El numero de tarjeta no debe estar vacio";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
