const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const articleSchema = new Schema(
    {
        status: {
            type: Number,
            default:0,
            enum:[0,1,2]
        },
        company:{
            type:String,
            required:true,
            trim:true
        },
        role:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required: true
        },
        updated: Date,
        publisher:{
            type:ObjectId,
            ref:"Student",
            required:true
        },
        edit_suggestions:{
            type: String
        }
    },
    {timestamps:true}
)

module.exports = mongoose.model("Article", articleSchema);