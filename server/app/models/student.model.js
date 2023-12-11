const mongoose = require("mongoose");

const Student = mongoose.model(
  "Student",
  new mongoose.Schema({
    roll_no: {
      type: String,
      unique: true,
      required : true
    },
    name: String,
    father_name: String,
    mobile: String
  })
);

module.exports = Student;
