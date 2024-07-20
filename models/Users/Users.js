const mongoose = require("mongoose");
const crypto=require('crypto')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter firstName"],
  },
  email: {
    type: String,
    required: [true, "Please Enter email"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Please Enter phone"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    minlength: [6, "name must be more than 6 character"],
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,

});

//Generate password reset token
UserSchema.methods.getRestPasswordToken=function(){
  //Generate Token
  const resetToken =crypto.randomBytes(20).toString("hex"); //like that 9341e20bff6b7dba15845c54bddb2c95bb66c137
  //Hashing and adding resetpasswordToken to userSchema
  this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")
  this.resetPasswordExpire=Date.now() + 15*60*1000;
  return resetToken
}
module.exports = mongoose.model("User", UserSchema);
