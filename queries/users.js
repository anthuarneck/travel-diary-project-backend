const db = require("../db/dbConfig");


const getOneUser = async (id) => {
  try {
    const oneUser = await db.one("SELECT * FROM travel_users WHERE id=$1", id);
    return oneUser;
  } catch (error) {
    console.error(error);
  }
};

const getOneUserByUsername = async (username) => {
  try {
    const oneUser = await db.one("SELECT * FROM travel_users WHERE username=$1", username);
    return oneUser;
  } catch (error) {
    console.error(error);
  }
}

const createUser = async (user) => {
  try {
    const createdUser = await db.one(
      "INSERT INTO travel_users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [user.firstName, user.lastName, user.username, user.password]
    );
    return createdUser;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getOneUser,
  createUser,
  getOneUserByUsername
};