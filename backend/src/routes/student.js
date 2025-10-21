const express = require('express');
const studentController = require('../controllers/studentController');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', authenticate, requireRole(['estudante']), studentController.getDashboard);

module.exports = router;