const studentService = require('../services/student.service');

exports.createStudent = async (req, res, next) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

exports.getStudents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const major = req.query.major;

    const result = await studentService.getStudents(page, limit, major);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

exports.getStudentById = async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await studentService.deleteStudent(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.updateScore = async (req, res, next) => {
  try {
    const { score } = req.body;
    const student = await studentService.updateScore(req.params.id, score);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

exports.getTopStudents = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 5;
    const students = await studentService.getTopStudents(limit);
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    next(error);
  }
};

exports.getAverageScore = async (req, res, next) => {
  try {
    const avgScore = await studentService.getAverageScore();
    res.status(200).json({ success: true, data: { averageScore: avgScore } });
  } catch (error) {
    next(error);
  }
};

exports.searchStudents = async (req, res, next) => {
  try {
    const keyword = req.query.q;
    if (!keyword) {
      return res.status(400).json({ success: false, message: 'Keyword q is required' });
    }
    const students = await studentService.searchStudents(keyword);
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    next(error);
  }
};
