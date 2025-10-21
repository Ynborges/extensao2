const prisma = require('../database/prisma');
const { hashPassword, comparePassword, generateToken } = require('../utils/auth');

class AuthService {
  async register(userData) {
    const { nomeCompleto, email, senha, tipoUsuario, ...profileData } = userData;

    // Verificar se o email já existe
    const existingUser = await prisma.usuario.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    // Hash da senha
    const hashedPassword = await hashPassword(senha);

    // Criar usuário e perfil em uma transação
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.usuario.create({
        data: {
          nomeCompleto,
          email,
          senha: hashedPassword,
          tipoUsuario
        }
      });

      let profile = null;
      if (tipoUsuario === 'estudante') {
        profile = await tx.perfilEstudante.create({
          data: {
            usuarioId: user.id,
            nomeEscola: profileData.nomeEscola,
            areaInteressePrincipal: profileData.areaInteressePrincipal,
            urlCurriculo: profileData.urlCurriculo || null
          }
        });
      } else if (tipoUsuario === 'instituicao') {
        profile = await tx.perfilInstituicao.create({
          data: {
            usuarioId: user.id,
            nomeInstituicao: profileData.nomeInstituicao,
            descricao: profileData.descricao,
            urlSite: profileData.urlSite || null,
            urlLogo: profileData.urlLogo || null
          }
        });
      }

      return { user, profile };
    });

    const token = generateToken({ userId: Number(result.user.id) });

    return {
      token,
      user: {
        id: Number(result.user.id),
        nomeCompleto: result.user.nomeCompleto,
        email: result.user.email,
        tipoUsuario: result.user.tipoUsuario,
        profile: result.profile ? {
          ...result.profile,
          id: Number(result.profile.id),
          usuarioId: Number(result.profile.usuarioId)
        } : null
      }
    };
  }

  async login(email, senha) {
    const user = await prisma.usuario.findUnique({
      where: { email },
      include: {
        perfilEstudante: true,
        perfilInstituicao: true
      }
    });

    if (!user || !user.ativo) {
      throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await comparePassword(senha, user.senha);
    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    const token = generateToken({ userId: Number(user.id) });

    const profile = user.perfilEstudante || user.perfilInstituicao;
    
    return {
      token,
      user: {
        id: Number(user.id),
        nomeCompleto: user.nomeCompleto,
        email: user.email,
        tipoUsuario: user.tipoUsuario,
        profile: profile ? {
          ...profile,
          id: Number(profile.id),
          usuarioId: Number(profile.usuarioId)
        } : null
      }
    };
  }

  async getProfile(userId) {
    const user = await prisma.usuario.findUnique({
      where: { id: userId },
      include: {
        perfilEstudante: true,
        perfilInstituicao: true
      }
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const profile = user.perfilEstudante || user.perfilInstituicao;
    
    return {
      id: Number(user.id),
      nomeCompleto: user.nomeCompleto,
      email: user.email,
      tipoUsuario: user.tipoUsuario,
      profile: profile ? {
        ...profile,
        id: Number(profile.id),
        usuarioId: Number(profile.usuarioId)
      } : null
    };
  }

  async forgotPassword(email) {
    const user = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!user) {
      // Por segurança, não revelamos se o email existe ou não
      return;
    }

    // Gerar token de reset (válido por 1 hora)
    const { generateToken: genToken } = require('../utils/auth');
    const resetToken = genToken({ userId: Number(user.id), type: 'reset' }, '1h');
    
    // Em um ambiente real, você enviaria este token por email
    console.log(`Token de reset para ${email}: ${resetToken}`);
    
    return resetToken;
  }

  async resetPassword(token, novaSenha) {
    try {
      const decoded = require('../utils/auth').verifyToken(token);
      
      if (decoded.type !== 'reset') {
        throw new Error('Token inválido');
      }

      const hashedPassword = await hashPassword(novaSenha);
      
      await prisma.usuario.update({
        where: { id: decoded.userId },
        data: { senha: hashedPassword }
      });
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  }
}

module.exports = new AuthService();