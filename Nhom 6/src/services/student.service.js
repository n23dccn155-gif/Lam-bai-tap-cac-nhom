const Student = require('../models/Student');

class StudentService {
  async createStudent(studentData) {
    const student = new Student(studentData);
    return await student.save();
  }

  async getStudents(page = 1, limit = 10, major) {
    const query = { isActive: true };
    if (major) {
      query.major = major;
    }

    const skip = (page - 1) * limit;

    const students = await Student.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Student.countDocuments(query);

    return {
      students,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalStudents: total
    };
  }

  async getStudentById(id) {
    return await Student.findOne({ _id: id, isActive: true });
  }

  async updateStudent(id, studentData) {
    return await Student.findOneAndUpdate(
      { _id: id, isActive: true },
      studentData,
      { new: true, runValidators: true }
    );
  }

  async deleteStudent(id) {
    return await Student.findOneAndUpdate(
      { _id: id, isActive: true },
      { isActive: false },
      { new: true }
    );
  }

  async updateScore(id, score) {
    // Validate score 0 - 100
    if (score === undefined || score < 0 || score > 100) {
      const error = new Error('Score must be a number between 0 and 100');
      error.statusCode = 400;
      throw error;
    }

    return await Student.findOneAndUpdate(
      { _id: id, isActive: true },
      { score },
      { new: true, runValidators: true }
    );
  }

  async getTopStudents(limit = 5) {
    return await Student.find({ isActive: true })
      .sort({ score: -1 })
      .limit(limit);
  }

  async getAverageScore() {
    const result = await Student.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, avgScore: { $avg: '$score' } } }
    ]);
    
    return result.length > 0 ? result[0].avgScore : 0;
  }

  async searchStudents(keyword) {
    const regex = new RegExp(keyword, 'i'); // Case-insensitive search
    return await Student.find({
      isActive: true,
      name: { $regex: regex }
    });
  }
}

module.exports = new StudentService();
