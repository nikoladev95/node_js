import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var heading = "<h1>Enter your name below</h1>";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { heading });
});

app.post("/submit", (req, res) => {
  const fNameLength = req.body.fName.length;
  const lNameLength = req.body.lName.length;
  const fullNameLength = fNameLength + lNameLength;
  heading = `<h1>There are ${fullNameLength} letters in your name.</h1>`;

  res.render("index.ejs", { heading });
  heading = "<h1>Enter your name below</h1>";
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
