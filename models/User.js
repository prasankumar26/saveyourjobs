import mongoose from "mongoose";
// email validation package 
import validator from "validator";
// hash pass 
import bcrypt from 'bcryptjs'
// jwt  json web token
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
 name: {
  type: String,
  required: [true, 'Please Provide Name'],
  minlength: 3,
  maxlength: 20,
  trim: true,
 },
 email: {
  type: String,
  required: [true, 'Please Provide Email'],
  validate: {
   validator: validator.isEmail,
   message: 'Please Provide a Valid Email',
  },
  unique: true,
 },
 password: {
  type: String,
  required: [true, 'Please Provide Password'],
  minlength: 6,
  select: false,
 },
 lastName: {
  type: String,
  trim: true,
  maxlength: 20,
  default: 'lastName'
 },
 location: {
  type: String,
  trim: true,
  maxlength: 20,
  default: 'my city'
 },
})

// hash password 
UserSchema.pre('save', async function () {
 // console.log(this.modifiedPaths());

 if(!this.isModified('password'))return
 const salt = await bcrypt.genSalt(10);
 this.password = await bcrypt.hash(this.password, salt)
})

// jwt authentication 
UserSchema.methods.createJWT = function () {
 return jwt.sign({ userId: this._id }, process.env.JWT_SECRET,
   { 
    expiresIn: process.env.JWT_LIFETIME 
   })
}

// compare password reg login pass need to match
UserSchema.methods.comparePassword = async function (candidatePassword) {
 const isMatch = await bcrypt.compare(candidatePassword, this.password)
 return isMatch
}

export default mongoose.model('User', UserSchema)