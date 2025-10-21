const express = require('express');
const courseController = require('../controllers/courseController');
const opportunityController = require('../controllers/opportunityController');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();

// Rotas de cursos para instituições
router.post('/courses', authenticate, requireRole(['instituicao']), courseController.createCourse);
router.put('/courses/:id', authenticate, requireRole(['instituicao']), courseController.updateCourse);
router.delete('/courses/:id', authenticate, requireRole(['instituicao']), courseController.deleteCourse);

// Rotas de oportunidades para instituições
router.post('/opportunities', authenticate, requireRole(['instituicao']), opportunityController.createOpportunity);
router.put('/opportunities/:id', authenticate, requireRole(['instituicao']), opportunityController.updateOpportunity);
router.delete('/opportunities/:id', authenticate, requireRole(['instituicao']), opportunityController.deleteOpportunity);

module.exports = router;