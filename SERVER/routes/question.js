const express = require('express');

const router = express.Router();

const {getProfessorById} = require('../controllers/professor');
const { isSignedIn, isAdmin } = require('../controllers/auth');
const { createQuestion, deleteQuestion, getQuestionById } = require('../controllers/question');

router.param('professorId', getProfessorById);
router.param('questionId', getQuestionById);

// add question
router.post('/admin/question/create/:professorId', isSignedIn,isAdmin, createQuestion);

// delete a question
router.delete('/admin/question/delete/:questionId/:professorId', isSignedIn, isAdmin, deleteQuestion);


module.exports = router;
