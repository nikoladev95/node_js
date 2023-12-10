import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/", async (req, res) => {
    const name = req.body.name;
    var category = "";
    if (name === "Nikola") {
        category = "Programming";
    } else

        if (name === "Bakura") {
            category = "Dark";
        } else {
            category = "Any";
        }

    try {
        const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}`);
        const data = response.data;

        res.render("index.ejs", { joke: data });
    } catch (error) {
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});