import api from './api';

export const blogService = {
  async getPosts(params = {}) {
    const response = await api.get('/blog', { params });
    return response.data;
  },

  async getPostBySlug(slug) {
    const response = await api.get(`/blog/${slug}`);
    return response.data;
  }
};