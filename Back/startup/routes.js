const express = require("express");
const user = require("../src/routes/User");


module.exports = function (app){
    app.use(express.json())
        .use("/api/user", user)
}