const express = require("express");
const { deleteArticle, getArticleById } = require("../controllers/article");
const { isSignedIn, isAuthenticated, isAdmin, professorIsAuthenticated } = require("../controllers/auth");
const {getProfessorById,getProfessor,updateProfessor, deleteStudent, blockStudent,unBlockStudent, promoteStudent, demoteStudent, getAllStudents} = require('../controllers/professor');
const { getStudentById } = require("../controllers/student");

// const {blockStudent, unBlockStudent} = require('../controllers/student');

const router = express.Router();

// parameter extractors
router.param("professorId", getProfessorById);
router.param('studentId',getStudentById);
router.param('articleId',getArticleById);

router.get('/professor/:professorId', isSignedIn, professorIsAuthenticated, getProfessor);
router.put('/professor/:professorId', isSignedIn, professorIsAuthenticated, updateProfessor);

// delete a student
router.delete('/admin/delete/:studentId/:professorId', isSignedIn, isAdmin, deleteStudent);

// block and unblock students
router.put('/admin/block/:studentId/:professorId', isSignedIn, isAdmin, blockStudent);
router.put('/admin/unblock/:studentId/:professorId', isSignedIn, isAdmin, unBlockStudent);

// promote and demote students
router.put('/admin/promote/:studentId/:professorId', isSignedIn, isAdmin, promoteStudent);
router.put('/admin/demote/:studentId/:professorId', isSignedIn, isAdmin, demoteStudent);

// delete article
router.delete(
    '/admin/article/delete/:articleId/:professorId',
    isSignedIn,
    isAdmin,
    deleteArticle
)


// get all students details
router.get('/admin/students/:professorId', isSignedIn, isAdmin, getAllStudents);

module.exports = router;
