const express = require("express");
const user = require("../src/routes/User");
const investiment = require("../src/routes/Investiment")

module.exports = function (app){
    app.use(express.json())
        .use("/user", user)
        .use("/investiment", investiment)
}