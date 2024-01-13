const express = require("express");
const fs = require("fs");
const db = require("../db.json");

const userRouter = express.Router();
const users = db["user"];

userRouter.get("/", (req, res) => {
  return res.json(users);
});

userRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const userFound = users.find((user) => user.id === id);

  if (userFound) {
    return res.json(userFound);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

userRouter.post("/", (req, res) => {
  const newUser = req.body;
  const value = {
    id: users.length + 1,
    ...newUser,
  };
  users.push(value);

  // Save updated data to the file
  fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

  // Return the complete user data in the response
  return res.status(201).json(value);
});

userRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { firstName, lastName, image, userName,registerType, phoneNumber, registerDate, email, password } = req.body;

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    // Update user data
    users[userIndex] = {
      id,
      firstName,
      lastName,
      image,
      userName,
      registerType,
      phoneNumber,
      registerDate,
      email,
      password
    };

    // Save updated data to the file
    fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

    return res.json(users[userIndex]);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});


userRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1)[0];

    fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

    return res.json(deletedUser);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

module.exports = userRouter;
