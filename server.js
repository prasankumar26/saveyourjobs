import express from 'express'
const app = express()

// dot env 
import dotenv from 'dotenv'
dotenv.config()

// express async errors 
import 'express-async-errors'

// morgon for see error logs in console
import morgon from 'morgan'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'


import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

// connect DB 
import connectDB from './db/connect.js'

// routes Import 
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'
import hostingRouter from './routes/hostingRoutes.js'

//Middleware 
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'
import authenticateUser from './middleware/auth.js'

// morgon for see error logs in console
if(process.env.NODE_ENV !== 'production'){
  app.use(morgon('dev'))
}


const __dirname = dirname(fileURLToPath(import.meta.url))
// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')))
// special middileware for json data available for controller 
app.use(express.json())

app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

// Router Import setup 
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs',authenticateUser,  jobsRouter)
app.use('/api/v1/hosting',authenticateUser,  hostingRouter)

// only when ready to deploy
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

// middleware 
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// start server 
const port = process.env.PORT || 5000

const start = async () =>{
 try {
   await connectDB(process.env.MONGO_URL)
   app.listen(port, () => console.log(`Server is listening on port ${port}...`))
 } catch (error) {
  console.log(error);
 }
}

start()