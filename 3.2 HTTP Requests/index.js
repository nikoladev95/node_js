import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Hello, World! This is a homepage!</h1>");
});

app.get("/contact", (req, res) => {
    res.send("<h1>Contact me</h1>Send an email to: <strong>nikola.milanovic.dev@gmail.com</strong>");
});

app.get("/about", (req, res) => {
    res.send("<h1>About me</h1><p>I'm revising NodeJS in order to pass my interview and get the job I've always wanted!</p>")
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});