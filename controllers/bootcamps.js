// @desc       Get all bootcamps
// @route      GET /api/v1/bootcamps
// @access     Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: '@todo return all bootcamps',
  })
}

// @desc       Get single bootcamp
// @route      GET /api/v1/bootcamps/:id
// @access     Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `@todo return ${req.params.id} bootcamp`,
  })
}

// @desc       Create a bootcamp
// @route      POST /api/v1/bootcamps
// @access     Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: '@todo add new bootcamp',
  })
}

// @desc       Update a bootcamp
// @route      PUT /api/v1/bootcamps/:id
// @access     Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `@todo update ${req.params.id} bootcamp`,
  })
}

// @desc       Delete a bootcamp
// @route      DELETE /api/v1/bootcamps/:id
// @access     Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `@todo delete ${req.params.id} bootcamp`,
  })
}