const mongoose = require("mongoose");

const Class = mongoose.model(
  "Class",
  new mongoose.Schema({
    class_name: String,
    students: [],
  })
);

module.exports = Class;
