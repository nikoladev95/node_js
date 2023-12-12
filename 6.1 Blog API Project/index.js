import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Blog from "./models/blog";

const app = express();
const port = 4000;

mongoose.connect("mongodb://localhost/blogs");

let posts = [];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CHALLENGE 1: GET All posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(post => post.id === id);

  res.json(post);
});

//CHALLENGE 3: POST a new post
app.post("/posts", async (req, res) => {
  const date = new Date(Date.now());
  const post = {
    id: lastId + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: date
  };

  lastId++;

  const createdPost = await Blog.create(post);
  res.json({ status: "OK" });
});

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postToUpdate = posts.find(post => post.id === id);

  const patchedPost = {
    id: id,
    title: req.body.title || postToUpdate.title,
    content: req.body.content || postToUpdate.content,
    author: req.body.author || postToUpdate.author
  };

  const postToUpdateIndex = posts.findIndex(post => post.id === id);

  posts[postToUpdateIndex] = patchedPost;
  res.json(patchedPost);
});

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postToDelete = posts.findIndex(post => post.id === id);

  if (postToDelete > -1) {
    posts.splice(postToDelete, 1);
    res.json(postToDelete);
  } else {
    res.statusCode(500);
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
