const express = require("express");
const fs = require("fs");
const db = require("../db.json");

const trackingRouter = express.Router();
const trackings = db["tracking"];

trackingRouter.get("/", (req, res) => {
  return res.json(trackings);
});

trackingRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const trackingFound = trackings.find((tracking) => tracking.id === id);

  if (trackingFound) {
    return res.json(trackingFound);
  } else {
    return res.status(404).json({ error: "Tracking not found" });
  }
});

trackingRouter.post("/", (req, res) => {
  const newTracking = req.body;
  const value = {
    id: trackings.length + 1,
    ...newTracking,
  };
  trackings.push(value);

  // Save updated data to the file
  fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

  // Return the complete tracking data in the response
  return res.status(201).json(value);
});

trackingRouter.put("/:email", (req, res) => {
  const userEmail = req.params.email ? req.params.email.toLowerCase() : null;

  if (!userEmail) {
    res.status(400).json({ error: 'Email parameter is missing.' });
    return;
  }

  const { userImage, username, petId, petImage, petName, phoneNumber, address, email, week1, week2, week3, week4, week5 } = req.body;

  const trackingIndex = trackings.findIndex((tracking) => tracking.email && tracking.email.toLowerCase() === userEmail);

  if (trackingIndex !== -1) {
    // Update tracking data
    trackings[trackingIndex] = {
      id: trackings[trackingIndex].id,
      userImage,
      username,
      petId,
      petImage,
      petName,
      phoneNumber,
      address,
      email,
      week1, 
      week2,
      week3,
      week4,
      week5
    };

    res.json(trackings[trackingIndex]); // Return the updated tracking data
  } else {
    res.status(404).json({ error: 'User tracking data not found.' });
  }
});



trackingRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const trackingIndex = trackings.findIndex((tracking) => tracking.id === id);

  if (trackingIndex !== -1) {
    const deletedTracking = trackings.splice(trackingIndex, 1)[0];

    fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

    return res.json(deletedTracking);
  } else {
    return res.status(404).json({ error: "Tracking not found" });
  }
});

module.exports = trackingRouter;
