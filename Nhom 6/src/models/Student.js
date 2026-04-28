const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  score: {
    type: Number,
    min: [0, 'Score must be at least 0'],
    max: [100, 'Score must not exceed 100'],
    default: 0
  },
  major: {
    type: String,
    enum: {
      values: ['IT', 'Business', 'Design', 'Marketing'],
      message: '{VALUE} is not a valid major'
    }
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
