import api from './api';

export const studentService = {
  async getDashboard() {
    const response = await api.get('/student/dashboard');
    return response.data;
  }
};