import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const fNameLength = req.body.fName.length;
  const lNameLength = req.body.lName.length;
  const fullNameLength = fNameLength + lNameLength;

  res.render("index.ejs", { nameLength: fullNameLength });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
