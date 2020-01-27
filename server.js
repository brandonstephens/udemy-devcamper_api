const express = require('express')
const dotenv = require('dotenv')

// Load env variables
dotenv.config({
  path: './config/config.env'
})

const app = express()

// get all bootcamps
app.get('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({
    success: true,
    msg: '@todo return all bootcamps'
  })
})

// update existing bootcamp
app.get('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `@todo return ${req.params.id} bootcamp`
  })
})

// add new bootcamp
app.post('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({
    success: true,
    msg: '@todo add new bootcamp'
  })
})

// update existing bootcamp
app.put('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `@todo update ${req.params.id} bootcamp`
  })
})

// delete bootcamp
app.delete('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `@todo delete ${req.params.id} bootcamp`
  })
})


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`😀 server running in ${process.env.NODE_ENV} on ${process.env.PORT}`))
