const { model, Schema } = require("mongoose");

const roleSchema = new Schema({
  value: String,
  createdAt: String,
  name: String,
  permisos: Array,
});
roleSchema.plugin(require("mongoose-autopopulate"));
module.exports = model("Roles", roleSchema);
