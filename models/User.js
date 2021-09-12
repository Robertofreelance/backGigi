const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  genero: String,
  createdAt: String,
  role: {
    type: Schema.Types.ObjectId,
    ref: "Roles",
    autopopulate: true
  },
  edad: Number,
  telefono: String,
});
userSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('User', userSchema);
