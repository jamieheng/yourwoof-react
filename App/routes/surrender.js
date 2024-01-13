const express = require("express");
const fs = require("fs");
const db = require("../db.json");

const surrenderRouter = express.Router();
const surrenders = db["surrender"];

surrenderRouter.get("/", (req, res) => {
  return res.json(surrenders);
});

surrenderRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const surrenderFound = surrenders.find((surrender) => surrender.id === id);

  if (surrenderFound) {
    return res.json(surrenderFound);
  } else {
    return res.status(404).json({ error: "Surrender not found" });
  }
});

surrenderRouter.post("/", (req, res) => {
  const newSurrender = req.body;
  const value = {
    id: surrenders.length + 1,
    ...newSurrender,
  };
  surrenders.push(value);

  // Save updated data to the file
  fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

  // Return the complete surrender data in the response
  return res.status(201).json(value);
});

surrenderRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { userImage, username, email, petImage, petName, petGender, petBreed, petAge, petDesc, petMedi} = req.body;

  const surrenderIndex = surrenders.findIndex((surrender) => surrender.id === id);

  if (surrenderIndex !== -1) {
    // Update surrender data
    surrenders[surrenderIndex] = {
      id,
      userImage,
      username,
      email,
      petImage,
      petName,
      petGender,
      petBreed,
      petAge,
      petDesc,
      petMedi,
     
    };

    // Save updated data to the file
    fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

    return res.json(surrenders[surrenderIndex]);
  } else {
    return res.status(404).json({ error: "Surrender not found" });
  }
});

surrenderRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const surrenderIndex = surrenders.findIndex((surrender) => surrender.id === id);

  if (surrenderIndex !== -1) {
    const deletedSurrender = surrenders.splice(surrenderIndex, 1)[0];

    fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

    return res.json(deletedSurrender);
  } else {
    return res.status(404).json({ error: "Surrender not found" });
  }
});

module.exports = surrenderRouter;
