const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title is required'],
    maxLength: 100,
  },
  text: {
    type: String,
    required: [true, `Reviews can't be empty`],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Rating is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
})

module.exports = mongoose.model('Review', ReviewSchema)
