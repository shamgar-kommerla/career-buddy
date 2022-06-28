import mongoose from 'mongoose';
const { Schema } = mongoose;


const formSchema = new Schema(
    {
        cg:{
            type: Number,
            required: true
        },
        tenth:{
            type: Number,
            required: true
        },
        twelth:{
            type: Number,
            required:true
        },
        company:{
            type: String,
            required:true
        },
        gradYear:{
            type: Number,
            required:true
        }
    },
    {timestamps:true}
)


module.exports = mongoose.model("Forum", formSchema);


