const mongoose = require('mongoose')

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  console.log('🍃', `MongoDB connected to: ${connection.connection.host}`.green.bold.underline)
}

module.exports = connectDB
