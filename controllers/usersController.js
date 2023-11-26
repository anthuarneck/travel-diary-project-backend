const express = require("express");
var bcrypt = require("bcryptjs");
const {
  getOneUserByUsername,
  createUser,
  getOneUser,
} = require("../queries/users");

const users = express.Router();

users.get("/:id", async (req, res) => {
  const { id } = req.params;
  const oneUser = await getOneUser(id);
  if (oneUser) {
    res.json(oneUser);
  } else {
    res.status(404).json({ error: "User Not Found" });
  }
});

users.post("/register", async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await createUser({
      ...userData,
      password: hashedPassword,
    });
    res.json(createdUser);
  } catch (error) {
    res.status(500).json({ error: "Error Creating User" });
  }
});

users.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getOneUserByUsername(username);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.json(user);
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

module.exports = users;
