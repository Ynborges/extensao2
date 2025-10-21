import api from './api';

export const courseService = {
  async getCourses(params = {}) {
    const response = await api.get('/courses', { params });
    return response.data;
  },

  async getCourseById(id) {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  async getCategories() {
    const response = await api.get('/courses/categories');
    return response.data;
  },

  async enrollInCourse(courseId) {
    const response = await api.post(`/courses/${courseId}/enroll`);
    return response.data;
  },

  async createCourse(courseData) {
    const response = await api.post('/institution/courses', courseData);
    return response.data;
  },

  async updateCourse(id, courseData) {
    const response = await api.put(`/institution/courses/${id}`, courseData);
    return response.data;
  },

  async deleteCourse(id) {
    const response = await api.delete(`/institution/courses/${id}`);
    return response.data;
  }
};