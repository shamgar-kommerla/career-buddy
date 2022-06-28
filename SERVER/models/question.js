const mongoose = require('mongoose');

const {Schema} = mongoose;

const quesSchema = new Schema(
    {
        question:{
            type:String,
            required:true,
            uniqie:true,
            trim:true
        },
        type:{
            type:String,
            required:true,
            trim:true
        },
        options:{
            type:Array
        }
    }
)

module.exports = mongoose.model('Question', quesSchema);