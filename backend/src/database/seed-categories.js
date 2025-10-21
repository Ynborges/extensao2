const prisma = require('../utils/prisma');

async function seedCategories() {
  try {
    const categories = [
      { nome: 'Tecnologia da Informação' },
      { nome: 'Administração' },
      { nome: 'Saúde' },
      { nome: 'Educação' },
      { nome: 'Engenharia' },
      { nome: 'Design' },
      { nome: 'Marketing' },
      { nome: 'Idiomas' },
      { nome: 'Gastronomia' },
      { nome: 'Mecânica' }
    ];

    for (const category of categories) {
      await prisma.categoriaCurso.upsert({
        where: { nome: category.nome },
        update: {},
        create: category
      });
    }

    console.log('✅ Categorias criadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar categorias:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCategories();