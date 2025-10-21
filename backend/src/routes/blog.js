const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/', blogController.getPosts);
router.get('/:slug', blogController.getPostBySlug);

module.exports = router;