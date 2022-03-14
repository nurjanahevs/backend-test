const Saldo = require("../models/saldoModel");

class saldoController {
  static async addSaldo(req, res, next) {
    try {
      const { saldoNow } = req.body;
      const result = await Saldo.create({
        saldoNow,
      });
      res.status(200).json({ message: "Saldo Added", data: result });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = saldoController;