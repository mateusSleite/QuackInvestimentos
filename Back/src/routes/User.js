const express = require("express");
const UserController = require("../controller/UserController.js")
const route = express.Router();

route
    .post("/login", UserController.login)
    .post("/register", UserController.register)

module.exports = route;
