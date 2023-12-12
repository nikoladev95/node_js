const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Todo = require("./models/todo");

// We can omit the default port (27017) after the localhost
mongoose.connect("mongodb://localhost/firstmongo");

// mongoose queue the request we have, so we can technically proceed with querying even though the connection hasn't been established yet

app.use("/", express.static(path.resolve(__dirname, 'assets')));

app.use(bodyParser.json());

app.get("/api/get", async (req, res) => {
	const records = await Todo.find();

	console.log("Response: ", records);

	res.json(records);
});

app.post("/api/create", async (req, res) => {
	const record = req.body;

	// response is from MongoDB database server
	const response = await Todo.create(record);
	console.log(response);

	res.json({ status: 'OK' });
});

app.post("/api/modify", async (req, res) => {
	const { old: oldTitle, new: newTitle } = req.body;

	const response = await Todo.updateOne({
		record: oldTitle
	}, {
		// $set makes sure that only the provided values get replaced, by merging the data together; if we set record with newTitle without it, our previous data will be lost, along with the date value
		$set: {
			record: newTitle
		}
	});

	console.log(response);

	res.json({ status: "OK" });
});

app.post("/api/delete", async (req, res) => {
	const { record } = req.body;

	const response = await Todo.deleteOne({ record });
	console.log(response);

	res.json({ status: "OK" });
});

app.listen(13371, () => {
	console.log("Server up");
});