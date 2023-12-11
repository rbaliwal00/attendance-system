// model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    teacher_email: {
        type: String,
        required: true,
    },
    name: String,
    class_number: {
        type: Schema.Types.ObjectId, // Corrected the type
        required: true,
    },
    attendance: [
        {
            date: {
                type: Date,
                unique: true,
            },
            present: [String], // Assuming roll_no is a string
            absent: [String], // Assuming roll_no is a string
        },
    ],
});

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
