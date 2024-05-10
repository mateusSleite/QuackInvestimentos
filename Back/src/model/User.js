const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      minlength: 6
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    cpf: {
      type: String,
      required: true
    },
    birth: {
      type: Date,
      required: true
    },
    extract: {
      type: Number,
      required: false
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date,
      required: false
    },
    removedAt: {
      type: Date,
      required: false
    },

  })
);

module.exports = User;