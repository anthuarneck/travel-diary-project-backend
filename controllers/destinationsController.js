const express = require("express");
const {
  getAllDestinations,
  getOneDestination,
  createDestination,
  updateDestination,
  deleteDestination,
} = require("../queries/destinations.js");

const memoriesController = require("./memoriesController.js")

const destinations = express.Router({ mergeParams: true });

destinations.use("/:destinationId/memories", memoriesController)

destinations.get("/", async (req, res) => {
  const allDestinations = await getAllDestinations();
  if (allDestinations[0]) {
    res.status(200).json({ success: true, data: { payload: allDestinations } });
  } else {
    res.status(500).json({ success: false, data: { error: "Server Error" } });
  }
});

destinations.get("/:index", async (req, res) => {
  const { index } = req.params;
  const oneDestination = await getOneDestination(index);
  if (oneDestination) {
    res.json(oneDestination);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

destinations.post("/", async (req, res) => {
  try {
    const createdDestination = await createDestination(req.body);
    res.json(createdDestination);
  } catch (error) {
    res.send(error);
  }
});

destinations.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDestination = await deleteDestination(id);
    if (deletedDestination) {
      res
        .status(200)
        .json({ success: true, payload: { data: deletedDestination } });
    }
  } catch (error) {
    res.send(error);
  }
});

destinations.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedDestination = await updateDestination(id, req.body);
  if (updatedDestination.id) {
    res.status(200).json(updatedDestination);
  } else {
    res.status(404).json("No Destination found with that ID");
  }
});

module.exports = destinations;
