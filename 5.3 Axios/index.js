import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const activity = req.body["type"];
    const participants = req.body["participants"];

    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${activity}&participants=${participants}`);
    const result = response.data;

    const randomActivityIndex = Math.floor(Math.random() * result.length);
    const randomActivity = result[randomActivityIndex];

    res.render("index.ejs", { data: randomActivity });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { error: "No activities that match your criteria." });
  }

});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
