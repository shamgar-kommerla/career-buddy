const express = require('express');
const router = express.Router();

const {shamgar,
    acceptArticle,
    suggestEdits,
    getArticleById, 
    createArticle, 
    getArticle, 
    deleteArticle, 
    updateArticle,
    getUnverifiedArticles,
    getMyPublishedArticles,
    getUpdateSuggestedArticles,
    getAllArticles} = require('../controllers/article');
const {isSignedIn, isPartialAdmin, isAuthenticated, isAdmin} = require('../controllers/auth');
const { getProfessorById } = require('../controllers/professor');
// const { getProfessorById } = require('../controllers/professor');
const { getStudentById } = require('../controllers/student');

// all the params
router.param('studentId', getStudentById);
router.param('articleId', getArticleById);
router.param('professorId', getProfessorById);
// router.param('professorId', getProfessorById );

// actual routes
router.get("/shamgar",isSignedIn ,shamgar);

// CREATE
router.post(
    '/article/create/:studentId',
    isSignedIn,
    isAuthenticated,
    createArticle
);

// read routes
router.get('/articles/:articleId', isSignedIn, getArticle);
router.get('/articles/unverified/:studentId', isSignedIn, isPartialAdmin, getUnverifiedArticles);

// get all my articles
router.get('/articles/published/:studentId',isSignedIn,isAuthenticated, getMyPublishedArticles);
router.get('/articles/suggestion/:studentId',isSignedIn, isAuthenticated, getUpdateSuggestedArticles);

// update route
router.put(
    '/article/:articleId/:studentId',
    isSignedIn,
    isAuthenticated,
    updateArticle
);

router.put(
    '/article/verify/:articleId/:studentId',
    isSignedIn,
    isPartialAdmin,
    acceptArticle
)

router.put(
    '/article/suggest/:articleId/:studentId',
    isSignedIn,
    isPartialAdmin,
    suggestEdits
)

// delete route
router.delete(
    '/article/:articleId/:studentId',
    isSignedIn,
    isPartialAdmin,
    deleteArticle
)



// listinng route
router.get('/articles',isSignedIn, getAllArticles);


// admin routes

module.exports = router;