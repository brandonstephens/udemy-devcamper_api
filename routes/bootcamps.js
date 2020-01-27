const express = require('express')
const router = express.Router()

// get all bootcamps
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    msg: '@todo return all bootcamps'
  })
})

// update existing bootcamp
router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `@todo return ${req.params.id} bootcamp`
  })
})

// add new bootcamp
router.post('/', (req, res) => {
  res.status(200).json({
    success: true,
    msg: '@todo add new bootcamp'
  })
})

// update existing bootcamp
router.put('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `@todo update ${req.params.id} bootcamp`
  })
})

// delete bootcamp
router.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `@todo delete ${req.params.id} bootcamp`
  })
})

module.exports = router
