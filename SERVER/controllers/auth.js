const Student = require('../models/student');
const {check, validationResult} = require('express-validator');
const Professor = require('../models/professor');

const jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    const student = new Student(req.body); // Student document will be created, with  unique _id
    student.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: "NOT ABLE to save user in DB"
            })
        }
        // if successful signup
        res.json({
            enrl: student.enrl,
            name: student.name,
            email: student.email,
            id: student._id,
            dept: student.dept,
            gradYear: student.gradYear
        });
    })
}

exports.profSignup = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg        })
    };

    const professor = new Professor(req.body);
    professor.save((err,user) => {
        if(err){
            return res.status(400).json({
                err:"Not able to save PROFESSOR into database"
            })
        }
        // if successful signup

        res.json({
            emplId: professor.emplId,
            name:professor.name,
            email:professor.email,
            id:professor._id,
            designation: professor.designation,
            role : professor.role
        });
    })
}

exports.signin = (req, res) => {
    const errors = validationResult(req);
    const {email, password} = req.body;

    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }

    // if no errors
    Student.findOne({ email }, (err, student) => {
        if( err || !student) {
            return res.status(400).json({
                error: "USER email does not exists"
            })
        }
        // if no errors
        if(!student.authenticate(password)){
            return res.status(400).json({
                error: "Email and password do not match"
            })
        }

        // if email & password exists
        // create token
        const token = jwt.sign({_id: student._id}, process.env.SECRET);
        // put the token in cookie
        res.cookie("token", token, {expire: new Date() + 9999});

        // send response to the frontend
        const {_id, name, email, role,dept,gradYear,photo} = student;
        return res.json({
            token, student : {_id, name, email, role,dept,gradYear,photo}
        })
    })
}

// professor signin
exports.profSignin = (req, res) => {
    const errors = validationResult(req);
    const {email, password} = req.body;

    // form validation errors
    if(!errors.isEmpty()){
        return res.status(400).json({
            error:array()[0].msg
        })
    }

    // if no errors from the form
    Professor.findOne({email}, (err, professor) => {
        if(err || !professor){
            return res.status(400).json({
                error:"USER email doesn't exists"
            });
        }
        // if password is wrong
        if(!professor.authenticate(password)){
            return res.status(400).json({
                error:"Email and password do not match"
            })
        }

        // if details are correct
        // create token
        const token = jwt.sign({_id:professor._id}, process.env.SECRET)
        // put the token in cookie
        res.cookie("token", token, {expire:new Date() + 3}); // 3 days lasting session

        // send response to the frontend
        const {_id, name, email, role,photo, designation,department, emplId} = professor;
        return res.json({
            token, professor:{_id, name, email, role,photo,designation,department,emplId}
        })
    })
};



exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User Signout Successful"
    });
}



// protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
})

// custom middlewares
exports.isAuthenticated = (req, res,next) => {
    // console.log(req.student);
    let checker = req.student && req.auth && req.student._id == req.auth._id;
    // console.log(checker);
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next();
}

exports.professorIsAuthenticated = (req, res, next) => {
    // console.log(req.student);
    let checker = req.professor && req.auth && req.professor._id == req.auth._id;
    // console.log(checker);
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next();
}

exports.isPartialAdmin = (req,res,next) => {
    if(req.student.role === 0){
        return res.status(403).json({
            error: "You are not P ADMIN, Access Denied"
        })
    }
    next();
}

exports.isAdmin = (req,res, next)=> {
    console.log("isAdmin invoked");
    if(req.professor.role !== 1){
        return res.status(400).json({
            error:"You are not ADMIN, Access Denied"
        })
    }
    // if admin
    next();
}