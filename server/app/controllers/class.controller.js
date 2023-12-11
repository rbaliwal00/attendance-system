const config = require("../config/auth.config");
const db = require("../models");
const { validationResult } = require('express-validator');

const { user: User, role: Role, refreshToken: RefreshToken } = db;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Class = require("../models/class.model");
const Student = require("../models/student.model");

exports.getAllClasses = async (req,res) => {
    const result = validationResult(req);
    try{
        if(result.isEmpty()){
            const classResult = await Class.find();
            return res.status(200).send(classResult);
        }
        return res.status(400).send({errors: result.array()});
    }catch(error){
        return res.status(500).send(error);
    }
}

exports.getClassById = async (req, res) => {
    const id = req.params.id;
    const result = validationResult(req);
  
    try {
      if (result.isEmpty()) {
        const classResult = await Class.findOne({ _id: id });
  
        if (!classResult) {
          return res.status(404).json({ message: 'Class not found' });
        }
  
        const studentOfClass = classResult.students;
        const studentsResult = await Student.find({ roll_no: { $in: studentOfClass } });

        return res.status(200).json({ class: classResult, students: studentsResult });
      } else {
        return res.status(400).json({ errors: result.array() });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  };

exports.createClass = async (req,res) => {
    const result = validationResult(req);
    try{
        if(result.isEmpty()){
            const duplicateClass = await Class.findOne({class_name: req.body.class_name});
            if(duplicateClass){
                return res.status(422).send(`Class with name ${req.body.class_name} already exits`);
            }
            const classResult = await Class.create(req.body);
            return res.status(201).send(classResult);
        }
        return res.status(500).send({errors: result.array()});
    }catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}

exports.updateClass = async (req,res) => {
    const result = validationResult(req);
    try{
        if(result.isEmpty()){
            const id = req.params.id;
            const classResult = await Class.updateOne({_id: id}, req.body);
            return res.status(204).send(classResult);
        }
        return res.status(500).send({errors: result.array()});
    }catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}

exports.deleteClass = async (req,res) => {
    try{
        const id = req.params.id;
        const classResult = await Student.deleteOne({_id: id});
        res.status(204).send("Deleted");
    }catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}