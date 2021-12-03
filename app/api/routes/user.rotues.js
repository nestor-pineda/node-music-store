const express = require("express");
const router = express.Router();
//importamos las funciones del controlador y del middleware
const { createUser, login, logout } = require("../controllers/user.controller");
const { isAuth } = require("../../middlewares/auth.middleware");

router.post("/register", createUser);
router.post("/login", login);
//le añadimos el middleware para que solo sea accesible si el user esta logueado
router.post("/logout", [isAuth], logout); // hay q meter el token!!

module.exports = router;
