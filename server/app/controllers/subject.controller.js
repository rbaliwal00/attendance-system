const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Subject = require("../models/subject.model");
const { validationResult } = require("express-validator");
const Class = require("../models/class.model");


exports.addSubject = async (req,res) => {
    console.log(req.body);
    const result = validationResult(req);
    
    try{
        if(result.isEmpty()){
            const classResult = await Class.findOne({_id: req.body.class_number});
            if(!classResult) {
                return res.status(422).send('Class Number does not exist!');
            }
            const subject = await Subject.create(req.body);
            return res.status(201).send(subject);
        }
        return res.status(400).send({errors: result.array()});
    }catch(error){
        return res.status(500).send(error);
    }
   
}

exports.getSubjectById = async (req,res) => {
    try{
        const id = req.params.subjectId;
        const subject = await Subject.find({_id: id})
        res.status(200).send(subject);
    }catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}

exports.getAllSubjects = async (req,res) =>{
    try{
        const subjects = await Subject.find()
        res.status(200).send(subjects);
    }catch(error){
        res.status(500).send(error);
    }
}

exports.updatedSubject = async (req,res) =>{
    const subjectId = req.params.id;
    try{
        const subjects = await Subject.updateOne(
            {_id: id},
            req.body
        )
        res.status(200).send(subjects);
    }catch(error){
        res.status(500).send(error);
    }
}

exports.deleteSubjectById = async (req,res) =>{
    try{
        const id = req.params.id;
        const subject = await Subject.deleteOne({_id: id})
        res.status(200).send(subject);
    }catch(error){
        res.status(500).send(error);
    }
}

exports.addAttendance = async (req, res) => {
    try {
        const dayAttendance = req.body.attendance;

        const year = dayAttendance.attendance.date.substring(0, 4);
        const month = dayAttendance.attendance.date.substring(5, 7);
        const day = dayAttendance.attendance.date.substring(8, 10);

        const dateStart = new Date(
            Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), 0, 0, 0)
        );

        const dateMax = new Date(
            Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), 23, 59, 59)
        );

        try {
            const query = {
                _id: req.params.id,
                "attendance.date": {
                    $gte: dateStart,
                    $lte: dateMax
                }
            };

            const subject = await Subject.findOne(query);

            if (subject) {
                // Date already exists
                return res.status(400).send("Date already exists in this subject.");
            } else {
                // Date doesn't exist, proceed with adding attendance
                const updatedSubject = await Subject.updateOne(
                    { _id: req.params.id },
                    { $push: { attendance: dayAttendance.attendance } }
                );
                res.status(200).send(updatedSubject);
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

exports.updateAttendance = async (req, res) => {
    const subjectId = req.params.subjectId;
    const subject = req.body.subject;
    try {
        const subject = await Subject.updateOne(
            {_id: subjectId},
            subject
        );
        res.status(200).send('Updated');
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteAttendance = async (req, res) => {
    const subjectId = req.body.subjectId;
    const newAttendance = [];
    const attendanceEntryId = req.body.attendanceEntryId;
    try {
        const subject = await Subject.findOne({_id: subjectId});
        const attendance = subject.attendance;
        attendance.forEach((x) => {
            if(x._id == attendanceEntryId){

            }else{
                newAttendance.push(x);
            }
        })

        subject.attendance = newAttendance;
        const updatedSubject = await Subject.updateOne({_id: subjectId}, subject);
        res.status(200).send('Updated');
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.rangeAttendance = async (req, res) => {
    try {
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const subjectId = req.body.subjectId;

        const dateStart = new Date(
            Date.UTC(startDate.year, startDate.month - 1, startDate.day, 0, 0, 0)
        );

        const dateMax = new Date(
            Date.UTC(endDate.year, endDate.month - 1, endDate.day, 23, 59, 59)
        );

        // Find the subject by subjectId
        const subject = await Subject.findOne({ _id: subjectId });
        
        if (subject) {
            // Filter attendance data within the specified date range
            const filteredAttendance = subject.attendance.filter(entry => {
                return entry.date >= dateStart && entry.date <= dateMax;
            });

            res.status(200).send(filteredAttendance);
        } else {
            res.status(404).send("Subject not found or no attendance within the specified date range.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};


