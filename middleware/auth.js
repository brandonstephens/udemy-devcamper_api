const jwt = require('jsonwebtoken')
const asyncHander = require('./async')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')

// protect routes
exports.protect = asyncHander(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //set token from bearer in header
    token = req.headers.authorization.split(' ')[1]
  }
  // set token from cookie
  // } else if (req.cookies.token) {
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

// grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(new ErrorResponse(`User role '${req.user.role}' is not authorized`, 403))
    }
    next()
  }
}
