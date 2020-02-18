const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const geocoder = require('../utils/geocoder')
const Bootcamp = require('../models/Bootcamp')

// @desc       Get all bootcamps
// @route      GET /api/v1/bootcamps
// @access     Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query
  const reqQuery = { ...req.query }

  // exclude fields from request query
  const removeFields = ['select', 'sort', 'page', 'limit']
  removeFields.forEach(param => delete reqQuery[param])

  let queryString = JSON.stringify(reqQuery)

  // convert operators
  queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

  // find resources
  query = Bootcamp.find(JSON.parse(queryString)).populate('courses')

  // select (filter)
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ')
    query = query.select(fields)
  }

  // sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    query = query.sort(sortBy)
  } else {
    query = query.sort('-createdAt')
  }

  // pagination
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 25
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await Bootcamp.countDocuments()

  query = query.skip(startIndex).limit(limit)

  // run query
  const bootcamps = await query

  // pagination result
  const pagination = {}

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }

  res.status(200).json({ success: true, count: bootcamps.length, pagination, data: bootcamps })
})

// @desc       Get single bootcamp
// @route      GET /api/v1/bootcamps/:id
// @access     Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)

  // if valid id doesn't exist
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
  }

  res.status(200).json({ success: true, data: bootcamp })
})

// @desc       Create a bootcamp
// @route      POST /api/v1/bootcamps
// @access     Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body)
  res.status(201).json({ success: true, data: bootcamp })
})

// @desc       Update a bootcamp
// @route      PUT /api/v1/bootcamps/:id
// @access     Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
  }

  res.status(200).json({ success: true, data: bootcamp })
})

// @desc       Delete a bootcamp
// @route      DELETE /api/v1/bootcamps/:id
// @access     Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)

  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
  }

  bootcamp.remove()

  res.status(200).json({ success: true, data: {} })
})

// @desc       Get bootcamps within in a radius
// @route      GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access     Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params

  // Get lat and long from geocoder
  const loc = await geocoder.geocode(zipcode)
  const lat = loc[0].latitude
  const lng = loc[0].longitude

  // Calc radius using radians
  // divide distance by radius of Earth(3,963 mi)
  const earthRadius = 3963
  const radius = distance / earthRadius

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  })

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  })
})

// @desc       Upload photo for bootcamp
// @route      PUT /api/v1/bootcamps/:id/photo
// @access     Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)

  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
  }

  if (!req.files) {
    return next(new ErrorResponse(`Photo required`, 400))
  }

  const file = req.files.file

  // validate image
  if (!file.mimetype.startsWith('image/')) {
    return next(new ErrorResponse(`Photo must be an image file format`, 400))
  }

  if (file.size > process.env.FILE_UPLOAD_MAX) {
    return next(new ErrorResponse(`Photo must be 1MB or less`, 400))
  }

  // make custom filename
  file.name = `${Date.now()}_${bootcamp._id}_${path.parse(file.name).name}${path.parse(file.name).ext}`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.log(err)
      return next(new ErrorResponse(`Error uploading photo`, 500))
    }

    const updatedBootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name })

    res.status(200).json({ success: true, data: file.name })
  })
})
