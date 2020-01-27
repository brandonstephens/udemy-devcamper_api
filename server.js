const express = require('express')
const dotenv = require('dotenv')

// Load env variables
dotenv.config({
  path: './config/config.env'
})

const app = express()

app.get('/', (req, res) => {
  // res.send({ msg: '🤪 Yellow from express!!!'})
  // res.sendStatus(400)
  // res.status(400).json({
  //   success: false,
  //   errors: '😕'
  // })

  res.status(200).json({
    success: true,
    id: 'yey'
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`😀 server running in ${process.env.NODE_ENV} on ${process.env.PORT}`))
