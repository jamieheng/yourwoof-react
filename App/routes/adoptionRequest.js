const express = require("express");
const fs = require("fs");
const db = require("../db.json");

const adoptionRequestRouter = express.Router();
const adoptionRequest = db["adoptionRequest"];

adoptionRequestRouter.get("/", (req, res) => {
  return res.json(adoptionRequest);
});

adoptionRequestRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const adoptionFound = adoptionRequest.find((adoption) => adoption.id === id);

  if (adoptionFound) {
    return res.json(adoptionFound);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
}); 

adoptionRequestRouter.post("/", (req, res) => {
  const newAdoption = req.body;
  const value = {
    id: adoptionRequest.length + 1,
    ...newAdoption,
  };
  adoptionRequest.push(value);

  // Save updated data to the file
  fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

  return res.json(value);
});

adoptionRequestRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { userImage, userUsername, petImage, petName, petId, email, phoneNumber, status } = req.body;

  const adoptionIndex = adoptionRequest.findIndex((adoption) => adoption.id === id);

  if (adoptionIndex !== -1) {
    // Update adoption data
    adoptionRequest[adoptionIndex] = {
      id,
      userImage,
      userUsername,
      petImage,
      petId,
      petName,
      email,
      phoneNumber,
      status,
    };

    // Update db object
    db["adoptionRequest"] = adoptionRequest;

    // Save updated data to the file
    fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

    return res.json(adoptionRequest[adoptionIndex]);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

adoptionRequestRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const adoptionIndex = adoptionRequest.findIndex((adoption) => adoption.id === id);

  if (adoptionIndex !== -1) {
    const deletedAdoption = adoptionRequest.splice(adoptionIndex, 1)[0];

    // Update db object
    db["adoptionRequest"] = adoptionRequest;

    // Save updated data to the file
    fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

    return res.json(deletedAdoption);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

module.exports = adoptionRequestRouter;
