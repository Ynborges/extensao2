const express = require('express');
const courseController = require('../controllers/courseController');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();

// Rotas públicas
router.get('/', courseController.getCourses);
router.get('/categories', courseController.getCategories);
router.get('/:id', courseController.getCourseById);

// Rotas protegidas - Estudante
router.post('/:id/enroll', authenticate, requireRole(['estudante']), courseController.enrollStudent);

module.exports = router;