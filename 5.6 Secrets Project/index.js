import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

const API_URL = "https://secrets-api.appbrewery.com";

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(`${API_URL}/random`);
        const secret = result.data.secret;
        const user = result.data.username;

        res.render("index.ejs", { secret, user });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }

});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
