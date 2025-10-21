const courseService = require('../services/courseService');
const { courseSchema } = require('../utils/validation');

class CourseController {
  async getCourses(req, res) {
    try {
      const { page = 1, limit = 12, modalidade, nivel, categoriaId, search } = req.query;
      const filters = { modalidade, nivel, categoriaId, search };
      
      const result = await courseService.getCourses(filters, parseInt(page), parseInt(limit));
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCourseById(req, res) {
    try {
      const { id } = req.params;
      const course = await courseService.getCourseById(id);
      res.json(course);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getCategories(req, res) {
    try {
      const categories = await courseService.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createCourse(req, res) {
    try {
      const { error, value } = courseSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const course = await courseService.createCourse(value, req.user.perfilInstituicao.id);
      res.status(201).json(course);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateCourse(req, res) {
    try {
      const { id } = req.params;
      const { error, value } = courseSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const course = await courseService.updateCourse(id, value, req.user.perfilInstituicao.id);
      res.json(course);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteCourse(req, res) {
    try {
      const { id } = req.params;
      const result = await courseService.deleteCourse(id, req.user.perfilInstituicao.id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async enrollStudent(req, res) {
    try {
      const { id } = req.params;
      const enrollment = await courseService.enrollStudent(id, req.user.id);
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new CourseController();