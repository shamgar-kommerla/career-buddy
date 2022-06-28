const express = require("express");
const router = express.Router();


const {getStudentById,getStudent, updateStudent, studentArticlesList, blockStudent, unBlockStudent} = require('../controllers/student');
const { isAuthenticated, isPartialAdmin, isSignedIn, isAdmin } = require('../controllers/auth');
const { getProfessorById } = require("../controllers/professor");

router.param("studentId", getStudentById);
router.param('professorId',getProfessorById);

router.get('/student/:studentId', isSignedIn, isAuthenticated, getStudent);
router.put('/student/:studentId', isSignedIn, isAuthenticated, updateStudent);



// get all articles written by this Student
router.get('/articles/student/:studentId', isSignedIn, isAuthenticated, studentArticlesList);



module.exports = router;
