const db = require("../db/dbConfig");

const getMemoriesByDestination = async (destinationId) => {
  try {
    const memories = await db.any(
      "SELECT memories.id, memories.rating, memories.cost, memories.review, memories.experiences, memories.date, travel_users.username, destinations.destination_name, destinations.image_url FROM memories JOIN travel_users ON travel_users.id = memories.travel_user_id JOIN destinations ON destinations.id = memories.destination_id WHERE destinations.id = $1",
      destinationId
    );
    return memories;
  } catch (error) {
    console.error(error);
  }
};

const getOneMemoryByDestination = async (destinationId, id) => {
  try {
    const memory = await db.one(
      "SELECT memories.id, memories.rating, memories.cost, memories.review, memories.experiences, memories.date, travel_users.username, destinations.destination_name, destinations.image_url FROM memories JOIN travel_users ON travel_users.id = memories.travel_user_id JOIN destinations ON destinations.id = memories.destination_id WHERE destinations.id = $1 AND memories.id = $2",
      [destinationId, id]
    );
    return memory;
  } catch (error) {
    console.error(error);
  }
};

const createMemory = async (destination_id, memory) => {
  try {
    const { rating, cost, review, experiences, date, travel_user_id } = memory;
    const createdMemory = await db.one(
      "INSERT INTO memories (rating, cost, review, experiences, date, travel_user_id, destination_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [rating, cost, review, experiences, date, travel_user_id, destination_id]
    );
    return createdMemory;
  } catch (error) {
    console.error(error);
  }
};

const deleteMemoryForDestination = async (destination_id, id) => {
  try {
    const deletedMemory = await db.one(
      "DELETE FROM memories WHERE destination_id = $1 AND id = $2 RETURNING *",
      [destination_id, id]
    );

    return deletedMemory;
  } catch (error) {
    console.error(error);
  }
};

const updateMemory = async (destination_id, id, memory) => {
  try {
    const { rating, cost, review, experiences, date, travel_user_id } = memory;
    const updatedMemory = await db.one(
      "UPDATE memories SET rating=$1, cost=$2, review=$3, experiences=$4, date=$5, travel_user_id=$6 WHERE destination_id=$7 AND id=$8 RETURNING *",
      [
        rating,
        cost,
        review,
        experiences,
        date,
        travel_user_id,
        destination_id,
        id,
      ]
    );
    return updatedMemory;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getMemoriesByDestination,
  getOneMemoryByDestination,
  createMemory,
  deleteMemoryForDestination,
  updateMemory,
};
