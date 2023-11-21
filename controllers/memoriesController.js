const express = require("express");
const {
  getMemoryByUserAndDestination,
  deleteMemoryForUser,
  createMemory,
} = require("../queries/memories");

const memories = express.Router({ mergeParams: true });

memories.get("/:userId/:destinationId", async (req, res) => {
  const { userId, destinationId } = req.params;
  const memoryByUserAndDestination = await getMemoryByUserAndDestination(
    userId,
    destinationId
  );
  res.json(memoryByUserAndDestination);
});

memories.post("/:userId/:destinationId", async (req, res) => {
  try {
    const { destinationId, userId } = req.params;
    const createdMemory = await createMemory(destinationId, userId);
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
