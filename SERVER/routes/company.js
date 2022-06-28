const express = require('express');
const router = express.Router();

const { getStudentById } = require('../controllers/student');
const {isSignedIn, isAdmin} = require('../controllers/auth');
const { createNewCompany, getAllCompanies } = require('../controllers/company');
const { getProfessorById } = require('../controllers/professor');

// PARAMS
router.param('studentId', getStudentById);
router.param('professorId', getProfessorById);

// get all companies
// router.get('/company/', getAllCompanies);

// add company
router.post('/company/create/:professorId', isSignedIn, isAdmin, createNewCompany);
router.get('/company/view', getAllCompanies);

module.exports = router;
