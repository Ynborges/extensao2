const blogService = require('../services/blogService');

class BlogController {
  async getPosts(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await blogService.getPosts(parseInt(page), parseInt(limit));
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPostBySlug(req, res) {
    try {
      const { slug } = req.params;
      const post = await blogService.getPostBySlug(slug);
      res.json(post);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new BlogController();