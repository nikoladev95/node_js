const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Secret = require("./models/secret");

mongoose.connect("mongodb://localhost/secrets");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const secrets = await Secret.find();
        res.render("index.ejs", { secrets });
    } catch (error) {
        res.status(500);
    }

});

app.post("/create", async (req, res) => {
    await Secret.create(req.body);
    res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await Secret.deleteOne({ _id: id });
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }

});

app.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const secret = await Secret.findOne({ _id: id });

    res.render("edit.ejs", { secret })
});

app.post("/update/:id", async (req, res) => {
    const id = req.params.id;

    await Secret.updateOne({ _id: id }, {
        $set: {
            fName: req.body.fName,
            lName: req.body.lName,
            secret: req.body.secret
        }
    });

    res.redirect("/");
});

app.get("*", (req, res) => {
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});