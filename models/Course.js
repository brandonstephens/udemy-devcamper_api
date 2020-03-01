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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
})

// average course tuition for bootcamp
CourseSchema.statics.getAverageCost = async function(bootcampId) {
  const data = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageCost: { $avg: '$tuition' },
      },
    },
  ])

  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(data[0].averageCost / 10) * 10,
    })
  } catch (err) {
    console.log(err)
  }
}

// Update average cost after save
CourseSchema.post('save', function() {
  this.constructor.getAverageCost(this.bootcamp)
})

// Update average cost after remove
CourseSchema.post('remove', function() {
  this.constructor.getAverageCost(this.bootcamp)
})

module.exports = mongoose.model('Course', CourseSchema)
