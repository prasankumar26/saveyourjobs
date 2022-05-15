import mongoose from 'mongoose'
// import moment from 'moment'
// const today = //moment().startOf('day')


const HostingSchema = new mongoose.Schema({
  hosting: {
    type: String,
    required: [true, 'Please provide Hosting'],
    maxlength: 150,
  }
    
  
})

export default mongoose.model('Hosting', HostingSchema)