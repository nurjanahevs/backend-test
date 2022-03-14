const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

class authJwt {
  static authentication(req, res, next) {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Mising_Token" };
    }
    jwt.verify(access_token, "evasitinurjanah", (err, decoded) => {
      if (err) {
        throw { name: "INVALID_TOKEN"};
      }
      req.userData = decoded;
      next();
    })
  }

  static async specificUser(req, res, next) {
    const { id } = req.params;
    try {
      const result = await User.findById(req.userData.id);
      console.log(result);
      if (result.id === id) {
        next();
      } else {
        throw { name: "UNAUTHORIZED_TOKEN" };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = authJwt;
