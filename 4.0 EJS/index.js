import express from "express";

const app = express();
const port = 3000;

var day = 0;

function getTheDay(req, res, next) {
    const date = new Date();
    day = date.getDay();
    next();
}

app.get("/", getTheDay, (req, res) => {
    res.render("index.ejs", { day: day });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});