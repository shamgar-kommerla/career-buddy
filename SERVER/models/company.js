const mongoose = require('mongoose');
const {Schema} = mongoose;
const {ObjectId} = mongoose.Schema;

// schema definition
const companySchema = new Schema (
    {
        name: {
            type:String,
            requiered: true
        }
    }
);

module.exports = mongoose.model("Company", companySchema);