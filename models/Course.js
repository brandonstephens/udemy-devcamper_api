const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  weeks: {
    type: Number,
    required: [true, 'Weeks is required'],
  },
  tuition: {
    type: Number,
    required: [true, 'Tuition cost is required'],
  },
  minimumSkill: {
    type: String,
    required: [true, 'Minimum skill level required'],
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
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
})

module.exports = mongoose.model('Course', CourseSchema)
