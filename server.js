const express = require('express')
const dotenv = require('dotenv')

// Load env variables
dotenv.config({
  path: './config/config.env'
})

// Create and run server
const app = express()
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`😀 server running in ${process.env.NODE_ENV} on ${process.env.PORT}`))
