const express = require('express');
const Professor = require('../models/professor');
const Student = require('../models/student');

exports.getProfessorById = (req, res, next, id) => {
    Professor.findById(id).exec((err, professor) => {
        if(err || !professor){
            return res.status(400).json({
                error: "Professor not found in DATABASE"
            })
        }
        req.professor = professor;
        next();
    })
}
exports.getProfessor = (req, res) => {
    //
}
exports.updateProfessor = (req, res) => {
    //
}
exports.deleteStudent = (req, res) => {
    //
}


// ADMINS
exports.blockStudent = (req, res) => {
    console.log("BLOCK");
    Student.findByIdAndUpdate(
        {_id:req.student._id},
        {
            $set: {role: -1}
        },
        {new:true, useFindAndModify:false},
        (err, student) => {
            if(err){
                return res.status(400).json({
                    error: "Couldn't block student"
                })
            }
            res.json(student);
        }
    )
}
exports.unBlockStudent = (req, res) => {
    console.log("UNBLOCK");
    Student.findByIdAndUpdate(
        {_id:req.student._id},
        {
            $set: {role: 0}
        },
        {new:true, useFindAndModify:false},
        (err, student) => {
            if(err){
                return res.status(400).json({
                    error: "Couldn't block student"
                })
            }
            res.json(student);
        }
    )
}

exports.promoteStudent = (req, res ) => {
    console.log("PROMOTE");
    Student.findByIdAndUpdate(
        {_id:req.student._id},
        {
            $set: {role: 1}
        },
        {new:true, useFindAndModify: false},
        (err, student) => {
            if(err){
                return res.status(400).json({
                    errror:"Couldn't promote student"
                })
            }
            // if successful
            res.json(student);
        }
    )
}

exports.demoteStudent = (req, res ) => {
    console.log("DEMOTE"    );
    Student.findByIdAndUpdate(
        {_id:req.student._id},
        {
            $set: {role: 0}
        },
        {new:true, useFindAndModify: false},
        (err, student) => {
            if(err){
                return res.status(400).json({
                    errror:"Couldn't promote student"
                })
            }
            // if successful
            res.json(student);
        }
    )
}


exports.getAllStudents = (req, res) => {
    Student.find((err,students) => {
        if(err){
            return res.status(400).json({
                error:"Couldn't fetch students details."
            })
        }
        res.json(students);
    })
}