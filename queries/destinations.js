const db = require("../db/dbConfig.js");

const getAllDestinations = async () => {
  try {
    const allDestinations = await db.any("SELECT * FROM destinations");
    console.log(allDestinations);
    return allDestinations;
  } catch (error) {
    console.error(error);
  }
};

const getOneDestination = async (id) => {
  try {
    const oneDestination = await db.one(
      "SELECT * FROM destinations WHERE id=$1",
      id
    );
    return oneDestination;
  } catch (error) {
    console.error(error);
  }
};

const createDestination = async (destination) => {
  try {
    const createdDestination = await db.one(
      "INSERT INTO destinations (destination_name, image_url) VALUES ($1, $2) RETURNING *",
      [destination.destination_name, destination.image_url]
    );
    return createdDestination;
  } catch (error) {
    console.error(error);
  }
};

const updateDestination = async (id, destination) => {
  try {
    const { destination_name, image_url } = destination;
    const updatedDestination = await db.one(
      "UPDATE destinations SET destination_name=$1, image_url=$2 WHERE id=$3",
      [destination_name, image_url, id]
    );
    return updatedDestination;
  } catch (error) {
    console.error(error);
  }
};

const deleteDestination = async (id) => {
  try {
    const deletedDestination = await db.one(
      "DELETE FROM destinations WHERE id=$1 RETURNING *", id
    );
    return deletedDestination
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllDestinations,
  getOneDestination,
  createDestination,
  updateDestination,
  deleteDestination,
};
