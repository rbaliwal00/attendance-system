const config = require("../config/auth.config");
const db = require("../models");
const { validationResult } = require('express-validator');

const { user: User, role: Role, refreshToken: RefreshToken } = db;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Student = require("../models/student.model");
const Subject = require("../models/subject.model");
const Class = require("../models/class.model");

exports.getAllStudents = async (req,res) => {
    const result = validationResult(req);

    try{
        if(result.isEmpty()){
            const students = await Student.find();
            return res.status(200).send(students);
        }
        return res.status(500).send({errors: result.array()});
    }catch(error){
        return res.status(500).send(error);
    }
}

exports.getStudentById = async (req,res) => {
    const id = req.params.id;
    const result = validationResult(req);

    try{
        if(result.isEmpty()){
            const student = await Student.findOne({roll_no: id});
            return res.status(200).send(student);
        }
        return res.status(500).send({errors: result.array()});
    }catch(error){
        return res.status(500).send(error);
    }
}

exports.createStudent = async (req,res) => {
    const result = validationResult(req);
    try{
        if(result.isEmpty()){
            const duplicateStudent = await Student.findOne({roll_no: req.body.roll_no});
            if(duplicateStudent){
                return res.status(422).send("Roll No. already exits");
            }
            const student = await Student.create(req.body);
            console.log(student);
            return res.status(201).send(student);
        }
        return res.status(500).send({errors: result.array()});
    }catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}

exports.updateStudent = async (req,res) => {
    const result = validationResult(req);
    try{
        if(result.isEmpty()){
            const id = req.params.id;
            const student = await Student.updateOne({roll_no: id}, req.body);
            console.log(student);
            return res.status(204).send(student);
        }
        return res.status(500).send({errors: result.array()});
       
    }catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}

exports.deleteStudent = async (req,res) => {
    try{
        const id = req.params.id;
        const student = await Student.deleteOne({roll_no: id});
        console.log(student);
        res.status(204).send("Deleted");
    }catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}

exports.getAllSubjectByStudentId = async (req,res) => {
    try {
        const rollNo = req.params.rollNo;
    
        // Find the student by roll number
        const student = await Student.findOne({ roll_no: rollNo });
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }
    
        // Find the class for the student
        const studentClass = await Class.findOne({ students: student.roll_no });
        if (!studentClass) {
          return res.status(404).json({ message: 'Class not found for the student' });
        }
    
        // Find all subjects for the class
        const subjects = await Subject.find({ class_number: studentClass._id });
    
        return res.status(200).json({ subjects });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}