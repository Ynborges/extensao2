const prisma = require('./prisma');
const { hashPassword } = require('../utils/auth');

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar categorias de curso
  const categorias = await prisma.categoriaCurso.createMany({
    data: [
      { nome: 'Tecnologia da Informação' },
      { nome: 'Logística' },
      { nome: 'Metalmecânica' },
      { nome: 'Eletroeletrônica' },
      { nome: 'Construção Civil' },
      { nome: 'Administração' },
      { nome: 'Saúde' },
      { nome: 'Turismo e Hospitalidade' }
    ],
    skipDuplicates: true
  });

  // Criar usuário admin
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@plataforma.com' },
    update: {},
    create: {
      nomeCompleto: 'Administrador do Sistema',
      email: 'admin@plataforma.com',
      senha: adminPassword,
      tipoUsuario: 'admin',
      emailConfirmado: true
    }
  });

  // Criar usuário instituição de exemplo
  const instituicaoPassword = await hashPassword('instituicao123');
  const instituicaoUser = await prisma.usuario.upsert({
    where: { email: 'senai@exemplo.com' },
    update: {},
    create: {
      nomeCompleto: 'SENAI Amazonas',
      email: 'senai@exemplo.com',
      senha: instituicaoPassword,
      tipoUsuario: 'instituicao',
      emailConfirmado: true
    }
  });

  const instituicao = await prisma.perfilInstituicao.upsert({
    where: { usuarioId: instituicaoUser.id },
    update: {},
    create: {
      usuarioId: instituicaoUser.id,
      nomeInstituicao: 'SENAI Amazonas',
      descricao: 'Serviço Nacional de Aprendizagem Industrial do Amazonas, oferecendo cursos técnicos e profissionalizantes de qualidade.',
      urlSite: 'https://senai-am.com.br'
    }
  });

  // Criar usuário estudante de exemplo
  const estudantePassword = await hashPassword('estudante123');
  const estudanteUser = await prisma.usuario.upsert({
    where: { email: 'joao@exemplo.com' },
    update: {},
    create: {
      nomeCompleto: 'João Silva Santos',
      email: 'joao@exemplo.com',
      senha: estudantePassword,
      tipoUsuario: 'estudante',
      emailConfirmado: true
    }
  });

  const estudante = await prisma.perfilEstudante.upsert({
    where: { usuarioId: estudanteUser.id },
    update: {},
    create: {
      usuarioId: estudanteUser.id,
      nomeEscola: 'Escola Estadual Amazonas',
      areaInteressePrincipal: 'Tecnologia da Informação'
    }
  });

  // Criar postagem de blog de exemplo
  await prisma.postagemBlog.upsert({
    where: { slug: 'mercado-trabalho-amazonas-2024' },
    update: {},
    create: {
      autorId: admin.id,
      titulo: 'Mercado de Trabalho no Amazonas: Oportunidades em 2024',
      conteudo: `
        <p>O mercado de trabalho no Amazonas está em constante evolução, com novas oportunidades surgindo especialmente nas áreas de tecnologia, logística e indústria.</p>
        
        <h2>Setores em Crescimento</h2>
        <p>A indústria do Amazonas necessitará de 175 mil profissionais qualificados até 2027, principalmente nas áreas de:</p>
        <ul>
          <li>Logística e Supply Chain</li>
          <li>Metalmecânica</li>
          <li>Eletroeletrônica</li>
          <li>Construção Civil</li>
          <li>Tecnologia da Informação</li>
        </ul>
        
        <h2>Importância da Qualificação</h2>
        <p>A qualificação profissional é fundamental para aproveitar essas oportunidades. Os cursos técnicos e profissionalizantes são uma excelente forma de se preparar para o mercado de trabalho.</p>
      `,
      slug: 'mercado-trabalho-amazonas-2024',
      publicadoEm: new Date()
    }
  });

  console.log('✅ Seed concluído com sucesso!');
  console.log('👤 Admin: admin@plataforma.com / admin123');
  console.log('🏢 Instituição: senai@exemplo.com / instituicao123');
  console.log('🎓 Estudante: joao@exemplo.com / estudante123');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });