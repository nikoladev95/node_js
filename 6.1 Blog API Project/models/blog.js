import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, default: Date.now() }
});

const model = mongoose.model("BlogModel", BlogSchema);

module.exports = model;