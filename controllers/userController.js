const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class userController {

  static async register(req, res, next) {
    const { name, hp, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
      const result = await User.create({
        name: name,
        hp: hp,
        email: email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "Data User Created", data: result });
    } catch (err) {
      next(err);
    }
  }

  static async viewUsers(req, res, next) {
    try {
      const result = await User.find().populate("saldo").select("-__v");
      if (result.length === 0) {
        throw { name: "NOT_FOUND_ALL" };
      } else {
        res.status(200).json({ message: "Show the Data Users", data: result });
      }
    } catch (err) {
      next(err);
    }
  }

  static async viewSpecificUser(req, res, next) {
    const { id } = req.params;

    try {
      const result = await User.findById(id);
      if (result === null) {
        throw { name: "NOT_FOUND_SPECIFIC" };
      } else {
        res.status(200).json({
          message: "User dengan ID tertentu ditampilkan",
          data: result,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      const result = await User.findByIdAndDelete(id);
      res.status(202).json({ message: "User dengan id tertentu didelete", data: result });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const result = await User.findOne({ email });
      if (!result) {
        throw { name: "UNAUTHORIZED" };
      }
      const passwordIsValid = bcrypt.compareSync(password, result.password);
      if (!passwordIsValid) {
        throw { name: "UNAUTHORIZED" };
      }
      const token = jwt.sign({ id: result.id, name: result, email: result.email, telp: result.telp }, "evasitinurjanah", {
        expiresIn: "1h",
      });

      res.status(200).json({ message: "Berhasil Login", data: result, AccessToken: token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = userController;
