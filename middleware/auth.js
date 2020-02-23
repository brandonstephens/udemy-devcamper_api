const jwt = require('jsonwebtoken')
const asyncHander = require('./async')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')

// protect routes
exports.protect = asyncHander(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }
  // else if(req.cookies.token) {
  //   token = req.cookies.token
  // }

  // make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized', 401))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)

    next()
  } catch (err) {
    return next(new ErrorResponse('Not authorized', 401))
  }
})
