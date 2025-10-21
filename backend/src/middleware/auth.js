const { verifyToken } = require('../utils/auth');
const prisma = require('../database/prisma');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token de acesso requerido' });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    const user = await prisma.usuario.findUnique({
      where: { id: decoded.userId },
      include: {
        perfilEstudante: true,
        perfilInstituicao: true
      }
    });

    if (!user || !user.ativo) {
      return res.status(401).json({ error: 'Usuário não encontrado ou inativo' });
    }

    const profile = user.perfilEstudante || user.perfilInstituicao;
    
    req.user = {
      ...user,
      id: Number(user.id),
      perfilEstudante: user.perfilEstudante ? {
        ...user.perfilEstudante,
        id: Number(user.perfilEstudante.id),
        usuarioId: Number(user.perfilEstudante.usuarioId)
      } : null,
      perfilInstituicao: user.perfilInstituicao ? {
        ...user.perfilInstituicao,
        id: Number(user.perfilInstituicao.id),
        usuarioId: Number(user.perfilInstituicao.usuarioId)
      } : null
    };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    if (!roles.includes(req.user.tipoUsuario)) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    next();
  };
};

module.exports = {
  authenticate,
  requireRole,
};