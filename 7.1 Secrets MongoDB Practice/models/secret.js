const mongoose = require("mongoose");

const SecretSchema = new mongoose.Schema({
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    secret: { type: String, required: true },
    date: { type: String, default: Date.now }
});

const model = mongoose.model("SecretModel", SecretSchema);

module.exports = model;