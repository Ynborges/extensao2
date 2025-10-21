const prisma = require('../utils/prisma');

class CourseService {
  async getCourses(filters = {}, page = 1, limit = 12) {
    const { modalidade, nivel, categoriaId, search } = filters;
    const skip = (page - 1) * limit;

    const where = {
      estaAtivo: true,
      ...(modalidade && { modalidade }),
      ...(nivel && { nivel }),
      ...(categoriaId && {
        categorias: {
          some: {
            categoriaId: parseInt(categoriaId)
          }
        }
      }),
      ...(search && {
        OR: [
          { titulo: { contains: search, mode: 'insensitive' } },
          { descricao: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    const [courses, total] = await Promise.all([
      prisma.curso.findMany({
        where,
        include: {
          instituicao: {
            select: {
              nomeInstituicao: true,
              urlLogo: true
            }
          },
          categorias: {
            include: {
              categoria: {
                select: {
                  id: true,
                  nome: true
                }
              }
            }
          }
        },
        orderBy: { criadoEm: 'desc' },
        skip,
        take: limit
      }),
      prisma.curso.count({ where })
    ]);

    return {
      courses: courses.map(course => ({
        ...course,
        id: Number(course.id),
        instituicaoId: Number(course.instituicaoId),
        categorias: course.categorias.map(c => ({
          ...c.categoria,
          id: Number(c.categoria.id)
        }))
      })),
      pagination: {
        page,
        limit,
        total: Number(total),
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getCourseById(id) {
    const course = await prisma.curso.findUnique({
      where: { id: parseInt(id), estaAtivo: true },
      include: {
        instituicao: {
          select: {
            nomeInstituicao: true,
            descricao: true,
            urlSite: true,
            urlLogo: true
          }
        },
        categorias: {
          include: {
            categoria: {
              select: {
                id: true,
                nome: true
              }
            }
          }
        }
      }
    });

    if (!course) {
      throw new Error('Curso não encontrado');
    }

    return {
      ...course,
      id: Number(course.id),
      instituicaoId: Number(course.instituicaoId),
      categorias: course.categorias.map(c => ({
        ...c.categoria,
        id: Number(c.categoria.id)
      }))
    };
  }

  async getCategories() {
    const categories = await prisma.categoriaCurso.findMany({
      orderBy: { nome: 'asc' }
    });
    
    return categories.map(category => ({
      ...category,
      id: Number(category.id)
    }));
  }

  async createCourse(courseData, instituicaoId) {
    const { categoriaIds, ...courseInfo } = courseData;

    return await prisma.$transaction(async (tx) => {
      const course = await tx.curso.create({
        data: {
          ...courseInfo,
          instituicaoId
        }
      });

      await tx.cursoCategoria.createMany({
        data: categoriaIds.map(categoriaId => ({
          cursoId: course.id,
          categoriaId
        }))
      });

      return await tx.curso.findUnique({
        where: { id: course.id },
        include: {
          categorias: {
            include: {
              categoria: true
            }
          }
        }
      });
    });
  }

  async updateCourse(id, courseData, instituicaoId) {
    const { categoriaIds, ...courseInfo } = courseData;

    // Verificar se o curso pertence à instituição
    const existingCourse = await prisma.curso.findFirst({
      where: { id: parseInt(id), instituicaoId }
    });

    if (!existingCourse) {
      throw new Error('Curso não encontrado ou sem permissão');
    }

    return await prisma.$transaction(async (tx) => {
      const course = await tx.curso.update({
        where: { id: parseInt(id) },
        data: courseInfo
      });

      if (categoriaIds) {
        await tx.cursoCategoria.deleteMany({
          where: { cursoId: course.id }
        });

        await tx.cursoCategoria.createMany({
          data: categoriaIds.map(categoriaId => ({
            cursoId: course.id,
            categoriaId
          }))
        });
      }

      return await tx.curso.findUnique({
        where: { id: course.id },
        include: {
          categorias: {
            include: {
              categoria: true
            }
          }
        }
      });
    });
  }

  async deleteCourse(id, instituicaoId) {
    const course = await prisma.curso.findFirst({
      where: { id: parseInt(id), instituicaoId }
    });

    if (!course) {
      throw new Error('Curso não encontrado ou sem permissão');
    }

    await prisma.curso.delete({
      where: { id: parseInt(id) }
    });

    return { message: 'Curso removido com sucesso' };
  }

  async enrollStudent(courseId, userId) {
    try {
      const enrollment = await prisma.matricula.create({
        data: {
          cursoId: parseInt(courseId),
          usuarioId: userId
        }
      });

      return enrollment;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new Error('Você já está matriculado neste curso');
      }
      throw error;
    }
  }
}

module.exports = new CourseService();