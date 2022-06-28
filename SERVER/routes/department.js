const express = require('express');
const { isSignedIn, isAdmin } = require('../controllers/auth');
const { getAllDepartments, createDepartment } = require('../controllers/department');
const { getProfessorById } = require('../controllers/professor');
const router = express.Router();

router.param('professorId', getProfessorById);

router.get('/departments', getAllDepartments);

router.post('/departments/create/:professorId', isSignedIn,isAdmin, createDepartment);

module.exports = router;