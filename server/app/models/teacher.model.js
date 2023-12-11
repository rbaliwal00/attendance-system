const mongoose = require("mongoose");

const Teacher = mongoose.model(
  "Teacher",
  new mongoose.Schema({
    name: {
      type: String,
      required : true
    },
    email: {
      type: String,
      unique: true,
      required : true
    }
  })
);

module.exports = Teacher;
