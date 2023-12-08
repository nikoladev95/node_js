import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var posts = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", (req, res) => {
    const title = req.body["title"];
    const post = req.body["post"];
    posts.push({
        title: title,
        post: post
    });
    res.render("index.ejs", { posts: posts });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});