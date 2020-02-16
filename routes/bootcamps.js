const express = require('express')
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require('../controllers/bootcamps')

const router = express.Router()

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp)

router
  .route('/:id')
  .put(updateBootcamp)
  .get(getBootcamp)
  .delete(deleteBootcamp)

module.exports = router
