const express = require("express");
const user = require("../src/routes/User");
const investiment = require("../src/routes/Investiment")

module.exports = function (app){
    app.use(express.json())
        .use("/api/user", user)
        .use("/api/investiment", investiment)
}