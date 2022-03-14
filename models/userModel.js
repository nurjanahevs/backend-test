const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  hp: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  saldo: [{ type: Schema.Types.ObjectId, ref: "saldo" }],
});

const User = mongoose.model("user", userSchema);
module.exports = User;
