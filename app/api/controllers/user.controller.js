const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

const createUser = async (req, res, next) => {
  try {
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.surname = req.body.surname;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.favCategories = [];

    const userDb = await newUser.save();

    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: null,
    });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    //Buscamos al user en bd
    const userInfo = await User.findOne({ email: req.body.email });
    //Comparamos la contraseña
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      //eliminamos la contraseña del usuario
      userInfo.password = null;
      //creamos el token con el id y el name del user
      const token = jwt.sign(
        {
          id: userInfo._id,
          name: userInfo.name,
        },
        req.app.get("secretKey"),
        { expiresIn: "1h" }
      );
      //devolvemos el usuario y el token.
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { user: userInfo, token: token },
      });
    } else {
      return res.json({ status: 400, message: HTTPSTATUSCODE[400], data: null });
    }
  } catch (err) {
    return next(err);
  }
};
//funcion logout, iguala el token a null.
const logout = (req, res, next) => {
  try {
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      token: null,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
  login,
  logout,
};
