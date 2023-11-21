const express = require("express");
const memories = express.Router({ mergeParams: true });
const {
  getMemoriesByDestination,
  deleteMemoryForUser,
  createMemory,
} = require("../queries/memories");
const { getOneDestination } = require("../queries/destinations");


memories.get("/", async (req, res) => {
  const { destinationId } = req.params;
  try {
    const destination = await getOneDestination(destinationId);
    const memoriesByDestination = await getMemoriesByDestination(destinationId);
    res.json({ ...destination, memoriesByDestination });
  } catch (error) {
    res.json(error);
  }
});

memories.post("/", async (req, res) => {
  try {
    const { destinationId } = req.params;
    const createdMemory = await createMemory(destinationId, req.body);
    if (createdMemory) {
      res.status(200).json({ success: true, payload: { data: createdMemory } });
    }
  } catch (error) {
    res.send(error);
  }
});

memories.delete("/:memoryId", async (req, res) => {
  try {
    const { memoryId } = req.params;
    const deletedMemory = await deleteMemoryForUser(memoryId);
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

module.exports = memories;
