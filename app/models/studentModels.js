const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    stdId: {
        type: String,
        required: true,
        unique: true 
      },
    name: {
        type: String,
        required: [true, 'Name is required'], // Mandatory field
        trim: true
      },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
      },
    age: {
        type: Number
      },
      courses: String,
      address: {
        city: String,
        zip: String
      }
})

const Student = mongoose.model('student',StudentSchema);
module.exports = Student;