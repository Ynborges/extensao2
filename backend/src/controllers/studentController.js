const studentService = require('../services/studentService');

class StudentController {
  async getDashboard(req, res) {
    try {
      const dashboard = await studentService.getDashboard(req.user.id);
      res.json(dashboard);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new StudentController();