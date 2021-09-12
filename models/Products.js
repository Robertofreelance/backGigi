const { model, Schema } = require('mongoose');

const roleSchema = new Schema({
  value: String,
  createdAt: String,
  name: String,
  stock: String,
});
roleSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('Products', roleSchema);
