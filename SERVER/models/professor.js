const mongoose = require('mongoose');
const { Schema } = mongoose;

const crypto = require("crypto");
// const uuidv1 = require("uuid/v1");
const { v1: uuidv1 } = require('uuid');

var professorSchema = new Schema({
    emplId:{
        type:String,
        maxlength: 15,
        trim:true,
        required:true,
        unique:true
    },
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
    },
    department:{
        type:String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    designation: {
        type: String,
        required:true
    },
    role: {
        type: Number,
        trim: true,
        default: 0
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    photo: {
        data: Buffer,
        contentType: String
    }
});



professorSchema
.virtual("password")
.set(function(password){
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
})
.get(function() {
    return this._password;
});

professorSchema.methods = {
    authenticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
      },
    
      securePassword: function(plainpassword) {
        if (!plainpassword) return "";
        try {
          return crypto
            .createHmac("sha256", this.salt)
            .update(plainpassword)
            .digest("hex");
        } catch (err) {
          return "";
        }
      }
};

module.exports = mongoose.model("Professor", professorSchema);