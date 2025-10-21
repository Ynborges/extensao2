const prisma = require('../utils/prisma');

class OpportunityService {
  async getOpportunities(page = 1, limit = 12) {
    const skip = (page - 1) * limit;

    const [opportunities, total] = await Promise.all([
      prisma.oportunidade.findMany({
        where: { estaAtivo: true },
        include: {
          instituicao: {
            select: {
              nomeInstituicao: true,
              urlLogo: true
            }
          },
          categoriaCursoRelacionada: {
            select: {
              id: true,
              nome: true
            }
          }
        },
        orderBy: { criadoEm: 'desc' },
        skip,
        take: limit
      }),
      prisma.oportunidade.count({ where: { estaAtivo: true } })
    ]);

    return {
      opportunities: opportunities.map(opp => ({
        ...opp,
        id: Number(opp.id),
        instituicaoId: Number(opp.instituicaoId),
        categoriaCursoRelacionadaId: opp.categoriaCursoRelacionadaId ? Number(opp.categoriaCursoRelacionadaId) : null,
        categoriaCursoRelacionada: opp.categoriaCursoRelacionada ? {
          ...opp.categoriaCursoRelacionada,
          id: Number(opp.categoriaCursoRelacionada.id)
        } : null
      })),
      pagination: {
        page,
        limit,
        total: Number(total),
        pages: Math.ceil(total / limit)
      }
    };
  }

  async createOpportunity(opportunityData, instituicaoId) {
    return await prisma.oportunidade.create({
      data: {
        ...opportunityData,
        instituicaoId
      },
      include: {
        categoriaCursoRelacionada: true
      }
    });
  }

  async updateOpportunity(id, opportunityData, instituicaoId) {
    const existingOpportunity = await prisma.oportunidade.findFirst({
      where: { id: parseInt(id), instituicaoId }
    });

    if (!existingOpportunity) {
      throw new Error('Oportunidade não encontrada ou sem permissão');
    }

    return await prisma.oportunidade.update({
      where: { id: parseInt(id) },
      data: opportunityData,
      include: {
        categoriaCursoRelacionada: true
      }
    });
  }

  async deleteOpportunity(id, instituicaoId) {
    const opportunity = await prisma.oportunidade.findFirst({
      where: { id: parseInt(id), instituicaoId }
    });

    if (!opportunity) {
      throw new Error('Oportunidade não encontrada ou sem permissão');
    }

    await prisma.oportunidade.delete({
      where: { id: parseInt(id) }
    });

    return { message: 'Oportunidade removida com sucesso' };
  }

  async applyToOpportunity(opportunityId, userId) {
    try {
      const application = await prisma.candidatura.create({
        data: {
          oportunidadeId: parseInt(opportunityId),
          usuarioId: userId
        }
      });

      return application;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new Error('Você já se candidatou a esta oportunidade');
      }
      throw error;
    }
  }
}

module.exports = new OpportunityService();