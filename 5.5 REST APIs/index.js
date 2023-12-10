import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourBearerToken = "21661be5-ff5f-4185-8fc7-016750f90cc4";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  const secret = req.body["secret"];
  const score = req.body["score"];
  try {
    const response = await axios.post(`${API_URL}/secrets`, {
      "secret": secret,
      "score": score
    }, config);

    const data = JSON.stringify(response.data);
    res.render("index.ejs", { content: data });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  const changedSecret = req.body.secret;
  const changedScore = req.body.score;

  try {
    const response = await axios.put(`${API_URL}/secrets/${searchId}`, {
      "secret": changedSecret,
      "score": changedScore,
    }, config);

    const data = JSON.stringify(response.data);
    res.render("index.ejs", { content: data });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  const secretToPatch = req.body.secret;
  const scoreToPatch = req.body.score;

  try {
    const response = await axios.patch(`${API_URL}/secrets/${searchId}`, {
      "secret": secretToPatch,
      "score": scoreToPatch
    }, config);

    const data = JSON.stringify(response.data);
    res.render("index.ejs", { content: data });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }

});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const response = await axios.delete(`${API_URL}/secrets/${searchId}`, config);
    const data = JSON.stringify(response.data);
    res.render("index.ejs", { content: data });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
