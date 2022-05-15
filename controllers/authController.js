import User from '../models/User.js'
import {StatusCodes} from 'http-status-codes'
import {BadRequestError, UnauthenticatedError} from '../errors/index.js'


// Register User 
const register = async (req,res) =>{
 // destructure values from req.body
 const {name,email,password} = req.body

 // if name email pass empty throw error 
 if(!name || !email || !password){
  throw new BadRequestError('Please provide All Values')
 }

 // if email exist already throw error 
 const userAlreadyExists = await User.findOne({email});
 if(userAlreadyExists){
  throw new BadRequestError('Email Already In Use')
 }

 // create User from mongoose create method 
  const user = await User.create({name, email, password})
  // jwt invoke and create user
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({user:{
   email: user.email,
   lastName: user.lastName,
   location: user.location,
   name: user.name,
  }, token, location: user.location})
}


// Login User 
const login = async (req,res) =>{
 // destructure values from req.body
 const {email,password} = req.body

 // if name email pass empty throw error 
 if(!email || !password){
  throw new BadRequestError('Please provide All Values')
 }

//  find user email if not there throw error 
 const user = await User.findOne({email}).select('+password')
 if(!user){
   throw new UnauthenticatedError('Invalid Credentials')
 }

//  password is not correct throw error 
 const isPasswordCorrect = await user.comparePassword(password)
 if(!isPasswordCorrect){
  throw new UnauthenticatedError('Invalid Credentials')
}

// jwt invoke and login user
const token = user.createJWT()
user.password = undefined
res.status(StatusCodes.OK).json({user,token,location:user.location})

}

// Update User 
const updateUser = async (req,res) =>{
  const {email,name,lastName,location} = req.body

  // if name email pass empty throw error 
 if(!name || !email || !lastName || !location){
  throw new BadRequestError('Please provide All Values')
 }

 //  find user id if not there throw error
 const user = await User.findOne({_id: req.user.userId})

 user.email = email
 user.name = name
 user.lastName = lastName
 user.location = location

 await user.save()

 // jwt invoke and update user
 const token = user.createJWT()
 res.status(StatusCodes.OK).json({user,token,location:user.location})
}

export { register, login, updateUser }