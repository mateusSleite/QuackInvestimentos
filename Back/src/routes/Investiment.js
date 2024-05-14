const express = require("express");
const InvestimentController = require("../controller/InvestimentController")
const route = express.Router();

route
    .post("/create", InvestimentController.createInvestiment)
    .get("/getall", InvestimentController.getAll)
    .get("/getid/:id", InvestimentController.getID)
    .put("/update/:id", InvestimentController.updateInvestment)
    .delete("/delete/:id", InvestimentController.deleteInvestiment)

module.exports = route;
