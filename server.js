const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')

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

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)

// Run server
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, console.log(`😀 server running in ${process.env.NODE_ENV} on ${process.env.PORT}`))

// Handle promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)

  // Close server & exit process
  server.close(() => process.exit(1))
})
