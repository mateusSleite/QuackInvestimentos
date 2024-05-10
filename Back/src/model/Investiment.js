const mongoose = require("mongoose");

const Investiment = mongoose.model(
    "Investiment",
    new mongoose.Schema({
        userId: {
            type: String,
            required: true,
        },
        nameInvestment: {
            type: String,
            required: false
        },
        value: {
            type: Number,
            required: false
        },
        startDate: {
            type: Date,
            required: false,
        },
        endDate: {
            type: Date,
            required: false
        },
        category: {
            type: String,
            required: false
        },
        isInput: {
            type: Boolean,
            required: false
        },
        extract: {
            type: Number,
            required: false
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