const mongoose = require('mongoose');
const { Schema } = mongoose;

const saldoSchema = new Schema(
  {
    saldoNow: String,
  },
  {
    timestamp: true,
  }
);

const Saldo = mongoose.model("saldo", saldoSchema);
module.exports = Saldo;