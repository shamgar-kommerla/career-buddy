const mongoose = require('mongoose');

const {Schema} = mongoose;

const deptSchema = new Schema(
    {
        name: {
            type:"String",
            required:true,
            unique:true,
            trim:true
        }
    }
)

module.exports = mongoose.model("Department", deptSchema);
