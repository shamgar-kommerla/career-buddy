const mongoose = require('mongoose');
const { Schema } = mongoose;

const crypto = require('crypto');
// const uuidv1 = require("uuid/v1");
const { v1: uuidv1 } = require('uuid');

var studentSchema = new Schema (
    {
        enrl:{
            type:String,
            unique:true,
            required:true,
            maxlength:15,
            trim:true
        },
        name: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true
        },
        about:{
            type:String,
            trim:true
        },
        email:{
            type: String,
            trim:true,
            required:true,
            unique:true
        },
        dept: {
            type: String,
            required: true,
            trim:true,
            maxlength: 4,
            enum:['CST', 'ETC', 'IT']
        },
        gradYear:{
            type: Number,
            required: true,
            trim:true
        },
        encry_password:{
            type: String,
            required: true
        },
        salt: String,
        role : {
            type: Number,
            default:0
        },
        publishes : {
            type: Array,
            default:[]
        },
        photo: {
            data: Buffer,
            contentType: String
        }
    },
    {timestamps:true}
)

studentSchema
.virtual("password")
.set(function(password){
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
})
.get(function() {
    return this._password;
});

studentSchema.methods = {
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

module.exports = mongoose.model("Student", studentSchema); 