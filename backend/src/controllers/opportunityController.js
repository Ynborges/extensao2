const opportunityService = require('../services/opportunityService');
const { opportunitySchema } = require('../utils/validation');

class OpportunityController {
  async getOpportunities(req, res) {
    try {
      const { page = 1, limit = 12 } = req.query;
      const result = await opportunityService.getOpportunities(parseInt(page), parseInt(limit));
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createOpportunity(req, res) {
    try {
      const { error, value } = opportunitySchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const opportunity = await opportunityService.createOpportunity(value, req.user.perfilInstituicao.id);
      res.status(201).json(opportunity);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateOpportunity(req, res) {
    try {
      const { id } = req.params;
      const { error, value } = opportunitySchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const opportunity = await opportunityService.updateOpportunity(id, value, req.user.perfilInstituicao.id);
      res.json(opportunity);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteOpportunity(req, res) {
    try {
      const { id } = req.params;
      const result = await opportunityService.deleteOpportunity(id, req.user.perfilInstituicao.id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async applyToOpportunity(req, res) {
    try {
      const { id } = req.params;
      const application = await opportunityService.applyToOpportunity(id, req.user.id);
      res.status(201).json(application);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new OpportunityController();