const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CourseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  description: String,
}, { _id: false })
CourseSchema.plugin(AutoIncrement);

module.exports = mongoose.model('Courses', CourseSchema)