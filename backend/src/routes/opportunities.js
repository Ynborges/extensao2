const express = require('express');
const opportunityController = require('../controllers/opportunityController');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();

// Rotas públicas
router.get('/', opportunityController.getOpportunities);

// Rotas protegidas - Estudante
router.post('/:id/apply', authenticate, requireRole(['estudante']), opportunityController.applyToOpportunity);

module.exports = router;