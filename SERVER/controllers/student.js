const Student = require('../models/student');
const Article = require('../models/article');

const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.getStudentById = (req, res, next, id) => {
    Student.findById(id).exec((err, student) => {
        if(err || !student){
            return res.status(400).json({
                error: "No student found in Database"
            })
        }
        req.student = student;
        // console.log(req.student);
        next();
    })
}

exports.getStudent = (req, res) => {
    req.student.salt = undefined;
    req.student.encry_password = undefined;
    return res.json(req.student);
}

// exports.updateStudent = (req,res) => { 
//     Student.findByIdAndUpdate(
//         {_id: req.student._id},
//         {$set: req.body},
//         {new: true, useFindAndModify: false},
//         (err, student) => {
//             if(err){
//                 return res.status(400).json({
//                     error: "You are not authorized to update this student"
//                 });
//             }
//             student.salt = undefined;
//             student.encry_password = undefined;
//             res.json(student);
//         }
//     );
// };

exports.updateStudent = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            console.log(err);
            return res.status(400).json({
                error: "Problem in form (image maybe)"
            })
        }

        let student = req.student;
        student = _.extend(student, fields);
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.json(400).json({
                    error: "File size too big"
                });
            }
            student.photo.data = fs.readFileSync(file.photo.filepath);
            student.photo.contentType = file.photo.type;
        }

        // save into DB
        student.save((err, student) => {
            if(err){
                res.status(400).json({
                    error: "Updatation of student failed"
                })
            }
            res.json(student);
        });
    });
}

exports.studentArticlesList = (req,res) => {
    console.log(req.student.enrl);
    Article.find({student_enrl: req.student.enrl})
    .exec((err, article) => {
        if(err){
            return res.status(400).json({
                error: "No Articles (some error occured)"
            })
        }
        return res.json(article);
        // populate() is used when we are referencing one collection with other
    })
}

exports.pushArticleInPublishList = (req, res,next) => {
    let publishes = [];


    next();
}



// PARTIAL ADMINS



// ADMINS
