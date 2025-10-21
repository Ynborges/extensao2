const prisma = require('../database/prisma');

class StudentService {
  async getDashboard(userId) {
    const [enrollments, applications] = await Promise.all([
      prisma.matricula.findMany({
        where: { usuarioId: userId },
        include: {
          curso: {
            include: {
              instituicao: {
                select: {
                  nomeInstituicao: true
                }
              }
            }
          }
        },
        orderBy: { dataInscricao: 'desc' }
      }),
      prisma.candidatura.findMany({
        where: { usuarioId: userId },
        include: {
          oportunidade: {
            include: {
              instituicao: {
                select: {
                  nomeInstituicao: true
                }
              }
            }
          }
        },
        orderBy: { dataCandidatura: 'desc' }
      })
    ]);

    return {
      enrollments,
      applications
    };
  }
}

module.exports = new StudentService();