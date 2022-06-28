const Question = require('../models/question');


exports.getQuestionById = (req, res, next, id) => {
    Question.findById(id)
    .exec((err,question) => {
        if(err) {
            return res.status(400).json({
                error: "Question NOT FOUND"
            })
        }
        req.question = question;
        next();
    })
}

exports.createQuestion = (req, res) => {
    const question = new Question(req.body);
    question.save((err,question) => {
        if(err){
            return res.status(400).json({
                error:"Couldn't add a new question"
            })
        }
        res.json(question);
    })
}

exports.deleteQuestion = (req, res) => {
    let question = req.question;
    console.log("delete question invoked");
    question.remove((err, deletedQuestion) => {
        if(err){
            return res.status(400).json({
                error:"Question Deletion failed"
            })
        }
        res.json({
            message:"Deletion Succesful",
            deletedQuestion
        })
    })
}