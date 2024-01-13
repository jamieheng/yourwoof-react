const express = require("express");
const fs = require("fs");
const db = require("../db.json");

const adoptionRouter = express.Router();
const adoption = db["adoption"];

adoptionRouter.get("/", (req, res) => {
  return res.json(adoption);
});

adoptionRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const adoptionFound = adoption.find((adoption) => adoption.id === id);

  if (adoptionFound) {
    return res.json(adoptionFound);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
}); 

adoptionRouter.post("/", (req, res) => {
  const newAdoption = req.body;
  const value = {
    id: adoption.length + 1,
    ...newAdoption,
  };
  adoption.push(value);

  // Save updated data to the file
  fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

  return res.json(value);
});

adoptionRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { userImage, userUsername, petImage, petName, email, phoneNumber, status } = req.body;

  const adoptionIndex = adoptionRequest.findIndex((adoption) => adoption.id === id);

  if (adoptionIndex !== -1) {
    // Update adoption data
    adoption[adoptionIndex] = {
      id,
      userImage,
      userUsername,
      petImage,
      petName,
      email,
      phoneNumber,
      status,
    };

    // Update db object
    db["adoption"] = adoption;

    // Save updated data to the file
    fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

    return res.json(adoption[adoptionIndex]);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

adoptionRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const adoptionIndex = adoption.findIndex((adoption) => adoption.id === id);

  if (adoptionIndex !== -1) {
    const deletedAdoption = adoption.splice(adoptionIndex, 1)[0];

    // Update db object
    db["adoption"] = adoption;

    // Save updated data to the file
    fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

    return res.json(deletedAdoption);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

module.exports = adoptionRouter;
