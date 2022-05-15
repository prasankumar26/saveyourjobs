import Hosting from '../models/Hosting.js'
import {StatusCodes} from 'http-status-codes'
import {BadRequestError, NotFoundError, UnauthenticatedError} from '../errors/index.js'

const createHosting = async (req,res) =>{
   const {hosting} = req.body

   if(!hosting) {
    throw BadRequestError('Plead provide Hosing name')
   }

   // get user Id from req.user.id 
   req.body.createdBy = req.user.userId

   const allhosting = await Hosting.create(req.body)
   res.status(StatusCodes.CREATED).json({allhosting})
}

const getAllHosting = async (req,res) =>{
 const hostings = await Hosting.find({createdBy: req.user.userId})
 res.status(StatusCodes.OK).json({hostings, totalJobs: hostings.length})
}


export {
 createHosting,
 getAllHosting
}