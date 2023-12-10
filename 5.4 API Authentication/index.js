import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourUsername = "dzonika";
const yourPassword = "dzonikadev";
const yourAPIKey = "0ea242d6-d1f1-4a24-b2df-565c657ec9db";
const yourBearerToken = "21661be5-ff5f-4185-8fc7-016750f90cc4";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/random`);
    const data = JSON.stringify(response.data);

    res.render("index.ejs", { content: data });
  } catch (error) {
    res.status(404).send("Error: ", error.message);
  }

});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/all?page=2`, {
      auth: {
        username: yourUsername,
        password: yourPassword
      }
    });
    const data = JSON.stringify(response.data);

    res.render("index.ejs", { content: data });
  } catch (error) {
    res.status(404).send("Error: ", error.message);
  }

});

app.get("/apiKey", async (req, res) => {
  try {
    const embarassmentScore = 5;
    const response = await axios.get(`${API_URL}/filter?score=${embarassmentScore}`, {
      params: {
        "apiKey": yourAPIKey
      }
    });
    const data = JSON.stringify(response.data);

    res.render("index.ejs", { content: data });
  } catch (error) {
    res.status(404).send("Error: ", error.message);
  }

});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/secrets/42`, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`
      }
    });
    const data = JSON.stringify(response.data);

    res.render("index.ejs", { content: data });
  } catch (error) {
    res.status(404).send("Error: ", error.message);
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
