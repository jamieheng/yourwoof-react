const express = require("express");
const fs = require("fs");
const db = require("../db.json");

const userRequestRouter = express.Router();
const userRequest = db["userRequest"];

userRequestRouter.get("/", (req, res) => {
  return res.json(userRequest);
});

userRequestRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const userFound = userRequest.find((user) => user.id === id);

  if (userFound) {
    return res.json(userFound);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

userRequestRouter.post("/", (req, res) => {
  const newUser = req.body;
  const value = {
    id: userRequest.length + 1,
    ...newUser,
  };
  userRequest.push(value);

  fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

  return res.json(value);
});

userRequestRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { firstName, lastName, image, username,registerType, phoneNumber, registerDate, email, password } = req.body;

  const userIndex = userRequest.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    // Update user data
    userRequest[userIndex] = {
      id,
      firstName,
      lastName,
      image,
      username,
      registerType,
      phoneNumber,
      registerDate,
      email,
      password
    };

    // Save updated data to the file
    fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

    return res.json(userRequest[userIndex]);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});


userRequestRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = userRequest.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    const deletedUser = userRequest.splice(userIndex, 1)[0];

    fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

    return res.json(deletedUser);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

module.exports = userRequestRouter;
