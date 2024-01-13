const express = require("express");
const fs = require("fs");
const db = require("../db.json");

const petRouter = express.Router();
const pets = db["pet"]; // Corrected variable name

petRouter.get("/", (req, res) => {
  return res.json(pets); // Corrected variable name
});

petRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const petFound = pets.find((val) => val.id === id);

  if (petFound) {
    return res.json(petFound);
  } else {
    return res.status(404).json({ error: "Pet not found" });
  }
});

petRouter.post("/", (req, res) => {
  const newPet = req.body;
  const value = {
    id: pets.length + 1,
    ...newPet,
  };
  pets.push(value);
  fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db));

  return res.json(value);
});

petRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, image, gender, breed, age, description, medicalStatus } = req.body;

  const petIndex = pets.findIndex((val) => val.id === id);

  if (petIndex !== -1) {
    // If the pet with the given id is found
    pets[petIndex] = {
      id,
      name,
      image,
      gender,
      breed,
      age,
      description,
      medicalStatus,
    };

    fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");
    
    return res.json(pets[petIndex]);
  } else {
    // If the pet with the given id is not found
    return res.status(404).json({ error: "Pet not found" });
  }
});

petRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const petIndex = pets.findIndex((pet) => pet.id === id);

  if (petIndex !== -1) {
    // If the pet with the given id is found
    const deletedPet = pets.splice(petIndex, 1)[0];
    
    // Asynchronously write the updated pets array to db.json
    fs.writeFile(__dirname + "/../db.json", JSON.stringify(db), "utf8", (err) => {
      if (err) {
        console.error("Error writing to db.json:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      
      return res.json(deletedPet);
    });
  } else {
    // If the pet with the given id is not found
    return res.status(404).json({ error: "Pet not found" });
  }
});

module.exports = petRouter;
