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

module.exports = {};
