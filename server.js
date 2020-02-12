const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')

// Load env variables
dotenv.config({
  path: './config/config.env',
})

// Connect to database
connectDB()

// Route files
const bootcamps = require('./routes/bootcamps')

// Init app
const app = express()

// Body parser
app.use(express.json())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)

app.use(errorHandler)

// Run server
const PORT = process.env.PORT || 5000
const server = app.listen(
  PORT,
  console.log(
    `💛 server running in`,
    `${process.env.NODE_ENV}`.yellow.bold,
    `environment on port`,
    `${process.env.PORT}`.yellow.bold
  )
)

// Handle promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)

  // Close server & exit process
  server.close(() => process.exit(1))
})
