const express = require("express");
const fs = require("fs");
const db = require("../db.json");

const adminRouter = express.Router();
const admins = db["admin"];

adminRouter.get("/", (req, res) => {
  return res.json(admins);
});

adminRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const adminFound = admins.find((admin) => admin.id === id);

  if (adminFound) {
    return res.json(adminFound);
  } else {
    return res.status(404).json({ error: "Admin not found" });
  }
});

adminRouter.post("/", (req, res) => {
  const newAdmin = req.body;
  const value = {
    id: admins.length + 1,
    ...newAdmin,
  };
  admins.push(value);

  // Save updated data to the file
  fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

  // Return the complete admin data in the response
  return res.status(201).json(value);
});

adminRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { firstName, lastName, image, userName, registerType, phoneNumber, registerDate, email, password } = req.body;

  const adminIndex = admins.findIndex((admin) => admin.id === id);

  if (adminIndex !== -1) {
    // Update admin data
    admins[adminIndex] = {
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

    return res.json(admins[adminIndex]);
  } else {
    return res.status(404).json({ error: "Admin not found" });
  }
});

adminRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const adminIndex = admins.findIndex((admin) => admin.id === id);

  if (adminIndex !== -1) {
    const deletedAdmin = admins.splice(adminIndex, 1)[0];

    fs.writeFileSync(__dirname + "/../db.json", JSON.stringify(db), "utf8");

    return res.json(deletedAdmin);
  } else {
    return res.status(404).json({ error: "Admin not found" });
  }
});

module.exports = adminRouter;
