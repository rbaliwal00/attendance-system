const { validationResult } = require('express-validator');

const Teacher = require("../models/teacher.model");
const Subject = require("../models/subject.model");
const Class = require("../models/class.model");


exports.getTeacherById = async (req,res) => {
    const id = req.params.id;
    const result = validationResult(req);

    try{
        if(result.isEmpty()){
            const teacher = await Teacher.findOne({id: id});
            return res.status(200).send(teacher);
        }
        return res.status(500).send({errors: result.array()});
    }catch(error){
        return res.status(500).send(error);
    }
}

exports.createTeacher = async (req,res) => {
    const result = validationResult(req);
    try{
        if(result.isEmpty()){
            const duplicateTeacher = await Teacher.findOne({email: req.body.email});
            if(duplicateTeacher){
                return res.status(422).send("Teacher with this email already exits");
            }
            const teacher = await Teacher.create(req.body);
            return res.status(201).send(teacher);
        }
        return res.status(500).send({errors: result.array()});
    }catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}

exports.updateTeacher = async (req,res) => {
    const result = validationResult(req);
    try{
        if(result.isEmpty()){
            const id = req.params.id;
            const teacher = await Teacher.updateOne({id: id}, req.body);
            return res.status(204).send(teacher);
        }
        return res.status(500).send({errors: result.array()});
       
    }catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}

exports.deleteTeacher = async (req,res) => {
    try{
        const id = req.params.id;
        const teacher = await Teacher.deleteOne({roll_no: id});
        res.status(204).send("Deleted");
    }catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}


exports.getAllSubjectsByTeacher = async (req, res) => {
    const result = validationResult(req);
    try {
      if (result.isEmpty()) {
        const teacherEmail = req.body.teacher_email;
  
        // First, find all subjects taught by the teacher
        const subjects = await Subject.find({ teacher_email: teacherEmail });
  
        // Initialize an array to store subject details with subject name and class name
        const subjectDetails = [];
  
        // Loop through the subjects and fetch the class name for each subject
        for (const subject of subjects) {
          const subjectWithClass = { ...subject.toObject() };
          const classInfo = await Class.findOne({ _id: subject.class_number });
        
          if (classInfo) {
            subjectWithClass.class_name = classInfo.class_name;
            subjectDetails.push(subjectWithClass);
          }
        }
        console.log(subjectDetails)
        return res.status(200).send(subjectDetails);
      }
      return res.status(500).send({ errors: result.array() });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };




