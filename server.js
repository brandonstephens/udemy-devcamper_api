const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

// Route files
const bootcamps = require('./routes/bootcamps')

// Load env variables
dotenv.config({
  path: './config/config.env',
})

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
app.listen(PORT, console.log(`😀 server running in ${process.env.NODE_ENV} on ${process.env.PORT}`))
