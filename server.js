//import npm packages
import 'dotenv/config.js'
import express from 'express'
import cors from 'cors'

// for the database connection
import './config/database.js';

//Import router
// import { router as scheduleRouter } from './routes/scheduleRoute.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// app.use('/submit', scheduleRouter)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})