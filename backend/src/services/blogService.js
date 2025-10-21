const prisma = require('../database/prisma');

class BlogService {
  async getPosts(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.postagemBlog.findMany({
        where: { 
          publicadoEm: { not: null }
        },
        include: {
          autor: {
            select: {
              nomeCompleto: true
            }
          }
        },
        orderBy: { publicadoEm: 'desc' },
        skip,
        take: limit
      }),
      prisma.postagemBlog.count({ 
        where: { publicadoEm: { not: null } }
      })
    ]);

    return {
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getPostBySlug(slug) {
    const post = await prisma.postagemBlog.findUnique({
      where: { 
        slug,
        publicadoEm: { not: null }
      },
      include: {
        autor: {
          select: {
            nomeCompleto: true
          }
        }
      }
    });

    if (!post) {
      throw new Error('Postagem não encontrada');
    }

    return post;
  }
}

module.exports = new BlogService();