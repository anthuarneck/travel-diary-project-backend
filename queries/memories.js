const db = require("../db/dbConfig");

const getMemoryByUserAndDestination = async (userId, destinationId) => {
    try {
      const memory = await db.any(
        "SELECT memories.id, memories.rating, memories.cost, memories.review, memories.experiences, memories.date, travel_users.username, destinations.destination_name, destinations.image_url FROM memories JOIN travel_users ON travel_users.id = memories.travel_user_id JOIN destinations ON destinations.id = memories.destination_id WHERE memories.travel_user_id = $1 AND destinations.id = $2",
        [userId, destinationId]
      );
      return memory;
    } catch (error) {
      console.error(error);
    }
  };
  

const createMemory = async (travel_user_id, destination_id) => {
  try {
    const createdMemory = await db.one(
      "INSERT INTO memories (destination_id, travel_user_id) VALUES ($1, $2) RETURNING *",
      [travel_user_id, destination_id]
    );
    return createdMemory;
  } catch (error) {
    console.error(error);
  }
};

const deleteMemoryForUser = async (travel_user_id, destination_id) => {
  try {
    await db.none(
      "DELETE FROM memories WHERE travel_user_id = $1 AND destination_id = $2",
      [travel_user_id, destination_id]
    );
    alert(`Memory with ID ${destination_id} deleted.`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
    getMemoryByUserAndDestination,
    createMemory,
    deleteMemoryForUser
}
