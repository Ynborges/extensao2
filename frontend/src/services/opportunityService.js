import api from './api';

export const opportunityService = {
  async getOpportunities(params = {}) {
    const response = await api.get('/opportunities', { params });
    return response.data;
  },

  async applyToOpportunity(opportunityId) {
    const response = await api.post(`/opportunities/${opportunityId}/apply`);
    return response.data;
  },

  async createOpportunity(opportunityData) {
    const response = await api.post('/institution/opportunities', opportunityData);
    return response.data;
  },

  async updateOpportunity(id, opportunityData) {
    const response = await api.put(`/institution/opportunities/${id}`, opportunityData);
    return response.data;
  },

  async deleteOpportunity(id) {
    const response = await api.delete(`/institution/opportunities/${id}`);
    return response.data;
  }
};