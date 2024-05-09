const mongoose = require("mongoose");

const Investiment = mongoose.model(
    "Investiment",
    new mongoose.Schema({
        userId: {
            type: String,
            required: true,
        },
        NameInvestment: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            required: true
        },
        startDate: {
            type: Date,
            required: true,
        },
        endStart: {
            type: Date,
            required: true
        },
        Category:{
            type: String,
            required: true
        },
        exitvalue:{
            type: Boolean,
            required: true
        },
        createdAt: {
            type: Date,
            required: true,
        },
        updatedAt: {
            type: Date,
            required: false
        },
        removedAt: {
            type: Date,
            required: false,
        },
    })
);

module.exports = Investiment;