const Article = require('../models/article');
const formidable = require('formidable');

const _ = require('lodash');
// const fs = require("fs");

exports.getArticleById = (req, res, next, id) => {
    Article.findById(id)
    .exec((err, article) => {
        if(err) {
            return res.status(400).json({
                error: "Article NOT FOUND"
            })
        }
        req.article = article;
        next();
    })
};


// create Article
// exports.createArticle = (req, res) => {
//     // console.log("Create Article invoked");
//     let form = new formidable.IncomingForm();
//     form.keepExtensions = true;

//     form.parse(req, (err, fields, file) => {
//         if(err) {
//             console.log(err);
//             return res.status(400).json({
//                 error: "Problem in form"
//             })
//         }

//         // destructure the fields
//         const {status, rounds, topics, content, finalSuggestion, student_enrl, student_name} = fields;
        
//         if(!status || !rounds || !topics || ! content || !finalSuggestion || !student_enrl, !student_name) {
//             return res.status(400).json({
//                 error:"Please include all fields"
//             })
//         }

//         let article = new Article(fields);

//         article.save((err, article) => {
//             if(err){
//                 return res.status(400).json({
//                     error: "Saving the article into DB failed"
//                 });
//             };
//             res.json(article);
//         });
//     });
// };


// trying something else for creating the article
exports.createArticle = (req, res) => {
    const article = new Article(req.body);
    article.save((err, article) => {
        if(err){
            return res.status(400).json({
                error: "Article not created",
                message: err
            });
        }else{
            console.log("Article created");
            res.json(article);
        }
    })
}


exports.getArticle = (req, res) => {
    return res.json(req.article);
}

// delete controllers
exports.deleteArticle = (req, res) => {
    let article = req.article;
    console.log("delete article invoked");
    article.remove((err, deletedArticle) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete Article"
            })
        }
        res.json({
            message:"Deletion was successful",
            deletedArticle
        })
    })
}


// update controllers
exports.updateArticle = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) =>{
        if(err){
            return res.status.json({
                error: "problem with form content"
            })
        }

        // updation code
        let article = req.article;
        article = _.extend(article, fields);

        // save to DB 
        article.save((err, article) => {
            if(err){
                res.status(400).json({
                    error: "Updatation faliled"
                });
            }
            res.json(article)
        })
    })
}


// article listing
exports.getAllArticles =(req, res) => {
    let limit = req.query.limit ? parseInf(req.query.limit) : 8;
    let sortBy = req.query.sortBy? req.query.sortBy : "_id";

    Article.find({status:2})
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, articles) => {
        if (err) {
            return res.status(400).json({
                error: "NO Article FOUND"
            });
        }
        res.json(articles);
    });
}

exports.getUnverifiedArticles = (req, res) => {
    let limit = req.query.limit ? parseInf(req.query.limit) : 8;
    let sortBy = req.query.sortBy? req.query.sortBy : "_id";

    Article.find({status:0})
    .sort([[sortBy, "asc"]])
    .exec((err, articles) => {
        if(err){
            return res.status(400).json({
                error:"No articles found"
            })
        }
        res.json(articles);
    })
}


exports.shamgar = (req, res) => {
    res.json({
        message:"Working"
    })
}

exports.acceptArticle = (req, res) => {
    Article.findByIdAndUpdate(
        {_id : req.article._id},
        {$set: {status: 2}},
        {new:true, useFindAndModify: false},
        (err, article) => {
            if(err){
                return res.status(400).json({
                    error: "Couldnd verify the article"
                })
            }
            res.json(article);
        }
    )
}

exports.suggestEdits = (req, res) => {
    const suggestions = req.body;
    // console.log(suggestions);
    Article.findByIdAndUpdate(
        {_id: req.article._id},
        {$set : {status:1},suggestions},
        {new: true, useFindAndModify: false},
        (err, article) => {
            if(err){
                return res.status(400).json({
                    error: "Couldn't update the suggestion"
                })
            }
            res.json(article)
        }
    )
}


exports.getMyPublishedArticles = (req, res) => {
    const user = req.student._id;
    // filters = publisher, status:2
    Article.find({status:2, publisher: user})
    .exec((err, articles) => {
        if(err){
            res.status(400).json({
                error: "No articles Published"
            })
        }
        res.json(articles);
    })
}

exports.getUpdateSuggestedArticles = (req, res) => {
    const user = req.student._id;
    // console.log({status:1,publisher:user});
    // filters = publisher, status:2
    Article.find({status:1,publisher:user})
    .exec((err, articles) => {
        if(err){
            res.status(400).json({
                error: err
            })
        }
        res.json(articles);
    })
}