const express = require("express");
const cors = require("cors");
const app = express();

const destinationsController = require("./controllers/destinationsController");
const usersController = require("./controllers/usersController");
const memoriesController = require("./controllers/memoriesController");

app.use(cors());
app.use(express.json());

app.use("/destinations", destinationsController);
app.use("/users", usersController);
app.use("/memories", memoriesController);

app.get("/", (req, res) => {
  res.send("Welcome to Travel Diary");
});

app.get("*", (req, res) => {
  res.status(404).json({ success: false, data: { error: "Page Not Found!" } });
});

module.exports = app;