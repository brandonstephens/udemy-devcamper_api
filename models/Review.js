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

// Limit user to 1 review to per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true })

// average rating
ReviewSchema.statics.getAverageRating = async function(bootcampId) {
  const data = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageRating: { $avg: '$rating' },
      },
    },
  ])

  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageRating: data[0].averageRating,
    })
  } catch (err) {
    console.log(err)
  }
}

// Update average cost after save
ReviewSchema.post('save', function() {
  this.constructor.getAverageRating(this.bootcamp)
})

// Update average cost after remove
ReviewSchema.post('remove', function() {
  this.constructor.getAverageRating(this.bootcamp)
})

module.exports = mongoose.model('Review', ReviewSchema)
