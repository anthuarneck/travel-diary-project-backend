const express = require("express");
const memories = express.Router({ mergeParams: true });
const {
  getMemoriesByDestination,
  getOneMemoryByDestination,
  deleteMemoryForDestination,
  createMemory,
  updateMemory,
} = require("../queries/memories");
const { getOneDestination } = require("../queries/destinations");

memories.get("/", async (req, res) => {
  const { destinationId } = req.params;
  try {
    const destination = await getOneDestination(destinationId);
    const memoriesByDestination = await getMemoriesByDestination(destinationId);
    res.json( memoriesByDestination );
  } catch (error) {
    res.json(error);
  }
});

memories.get("/:memoryId", async (req, res) => {
  const { destinationId, memoryId } = req.params;
  try {
    const destination = await getOneDestination(destinationId);
    const oneMemoryByDestination = await getOneMemoryByDestination(
      destinationId,
      memoryId
    );
    if (destination && oneMemoryByDestination) {
      res.json(oneMemoryByDestination);
    } else {
      res.status(404).json({ message: "Destination or memory not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

memories.post("/", async (req, res) => {
  try {
    const { destinationId } = req.params;
    const destinationExists = await getOneDestination(destinationId);
    if (!destinationExists) {
      return res.status(404).json({ error: "Destination not found" });
    }
    const createdMemory = await createMemory(destinationId, req.body);
    if (createdMemory) {
      res.json(createdMemory);
    } else {
      res.status(400).json({ error: "Failed to create memory" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

memories.delete("/:memoryId", async (req, res) => {
  try {
    const { destinationId, memoryId } = req.params;
    const deletedMemory = await deleteMemoryForDestination(
      destinationId,
      memoryId
    );
    if (deletedMemory) {
      res.status(200).json({
        success: true,
        payload: {
          data: deletedMemory,
        },
      });
    }
  } catch (error) {
    res.send(error);
  }
});

memories.put("/:memoryId", async (req, res) => {
  const { destinationId, memoryId } = req.params;
  const { rating, cost, review, experiences, date, travel_user_id } = req.body;
  const updatedMemory = await updateMemory(destinationId, memoryId, {
    rating,
    cost,
    review,
    experiences,
    date,
    travel_user_id,
    id: memoryId,
  });

  if (updatedMemory && updatedMemory.id) {
    res.status(200).json(updatedMemory);
  } else {
    res.status(404).json("There was a problem updating Memory!");
  }
});

module.exports = memories;
