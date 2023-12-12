const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

mongoose.connect("mongodb://localhost/blogs");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    const blogs = await Blog.find();

    res.render("index.ejs", { blogs });
});

app.post("/create-blog", async (req, res) => {
    await Blog.create(req.body);

    res.redirect("/");
});

app.get("/update/:id", async (req, res) => {
    const id = req.params.id;

    await Blog.updateOne({ _id: id }, {
        $set: {
            title: "AAAA",
            content: "UPDATED ONE!"
        }
    });
    res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
    const id = req.params.id;

    await Blog.deleteOne({ _id: id });
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});