const express = require("express");
const InvestimentController = require("../controller/InvestimentController")
const route = express.Router();

route
    .post("/create", InvestimentController.createInvestiment)

module.exports = route;
