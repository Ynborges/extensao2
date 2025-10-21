# 🎓 Plataforma de Divulgação de Cursos - Manaus/AM

Uma plataforma moderna e completa para conectar jovens estudantes do ensino médio em Manaus aos melhores cursos técnicos e profissionalizantes da região, preparando-os para as demandas do mercado de trabalho local.

## 🎯 Objetivo

Suprir a lacuna na formação de jovens, oferecendo qualificação alinhada à demanda da indústria amazonense. A indústria do Amazonas necessitará de **175 mil profissionais qualificados até 2027** em áreas como logística, metalmecânica, eletroeletrônica e construção.

## 🏗️ Arquitetura

### Backend (Node.js/Express)
- **Framework**: Express.js
- **ORM**: Prisma
- **Banco**: PostgreSQL
- **Autenticação**: JWT
- **Validação**: Joi
- **Segurança**: Helmet, bcrypt

### Frontend (React)
- **Framework**: React 18 + Vite
- **Estilo**: Tailwind CSS
- **Roteamento**: React Router DOM
- **Estado**: React Query + Context API
- **Formulários**: React Hook Form
- **HTTP**: Axios

## 🗄️ Banco de Dados

O sistema utiliza PostgreSQL com o seguinte esquema principal:

- **usuarios** - Usuários do sistema (estudantes, instituições, admins)
- **perfis_estudante** - Dados específicos dos estudantes
- **perfis_instituicao** - Dados específicos das instituições
- **cursos** - Cursos oferecidos pelas instituições
- **categorias_curso** - Categorias dos cursos (TI, Logística, etc.)
- **oportunidades** - Vagas de emprego/estágio
- **matriculas** - Inscrições dos estudantes em cursos
- **candidaturas** - Candidaturas a oportunidades
- **postagens_blog** - Artigos e conteúdo educativo

## 🚀 Funcionalidades

### Para Estudantes
- ✅ Cadastro e autenticação
- ✅ Busca e filtros avançados de cursos
- ✅ Visualização detalhada de cursos
- ✅ Inscrição em cursos de interesse
- ✅ Dashboard pessoal
- ✅ Candidatura a oportunidades
- 🔄 Acompanhamento de progresso

### Para Instituições
- ✅ Cadastro e autenticação
- ✅ Criação e gerenciamento de cursos
- ✅ Publicação de oportunidades
- 🔄 Dashboard com métricas
- 🔄 Gerenciamento de inscrições

### Para Administradores
- ✅ Autenticação administrativa
- 🔄 Painel de controle completo
- 🔄 Gerenciamento de usuários
- 🔄 Moderação de conteúdo
- 🔄 Relatórios e analytics

### Funcionalidades Gerais
- ✅ Interface responsiva e moderna
- ✅ SEO otimizado para Manaus/AM
- ✅ Sistema de notificações
- 🔄 Blog educativo
- 🔄 Sistema de avaliações
- 🔄 Integração com redes sociais

## 📋 Pré-requisitos

- Node.js (versão LTS)
- PostgreSQL (versão 12+)
- npm ou yarn

## ⚙️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd extensao2
```

### 2. Configure o Backend
```bash
cd backend
npm install
cp .env.example .env
# Edite o .env com suas configurações
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

### 3. Configure o Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Edite o .env se necessário
npm run dev
```

### 4. Acesse a aplicação
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 👥 Usuários de Teste

Após executar o seed do banco, você terá:

- **Admin**: admin@plataforma.com / admin123
- **Instituição**: senai@exemplo.com / instituicao123
- **Estudante**: joao@exemplo.com / estudante123

## 📚 API Endpoints

### Públicos
- `GET /api/courses` - Listar cursos
- `GET /api/courses/:id` - Detalhes do curso
- `GET /api/opportunities` - Listar oportunidades
- `GET /api/blog` - Artigos do blog

### Autenticação
- `POST /api/auth/register` - Cadastro
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Perfil do usuário

### Estudante
- `POST /api/courses/:id/enroll` - Inscrever-se em curso
- `GET /api/student/dashboard` - Dashboard

### Instituição
- `POST /api/institution/courses` - Criar curso
- `PUT /api/institution/courses/:id` - Atualizar curso
- `DELETE /api/institution/courses/:id` - Remover curso

## 🎨 Design System

### Cores
- **Primary**: Azul (#3b82f6) - Confiança e profissionalismo
- **Secondary**: Verde (#10b981) - Crescimento e oportunidade
- **Accent**: Amarelo - Energia e otimismo

### Tipografia
- **Font**: Inter - Moderna e legível
- **Hierarquia**: h1-h6 bem definida

### Componentes
- Cards responsivos
- Formulários acessíveis
- Navegação intuitiva
- Filtros avançados

## 🔒 Segurança

- Senhas hasheadas com bcrypt
- JWT com expiração configurável
- Validação de dados no backend
- Headers de segurança com Helmet
- CORS configurado
- Sanitização de inputs

## 📱 Responsividade

- **Mobile First** - Otimizado para dispositivos móveis
- **Breakpoints**: 640px, 768px, 1024px, 1280px
- **Touch Friendly** - Botões e links adequados para toque

## 🚀 Deploy

### Backend (Heroku/Railway)
1. Configure as variáveis de ambiente
2. Configure o banco PostgreSQL
3. Execute as migrações
4. Deploy da aplicação

### Frontend (Netlify/Vercel)
1. Configure as variáveis de ambiente
2. Build command: `npm run build`
3. Publish directory: `dist`

## 🧪 Testes

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📊 Métricas e Analytics

- Google Analytics configurado
- Métricas de uso da plataforma
- Relatórios de inscrições
- Dashboard administrativo

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

- **Email**: contato@cursosmanaus.com
- **Telefone**: (92) 3000-0000
- **Endereço**: Manaus, Amazonas

## 🎯 Roadmap

### Fase 1 (Atual) ✅
- [x] Sistema de autenticação
- [x] CRUD de cursos
- [x] Interface básica
- [x] Dashboard do estudante

### Fase 2 🔄
- [ ] Sistema de oportunidades completo
- [ ] Blog funcional
- [ ] Dashboard da instituição
- [ ] Sistema de notificações

### Fase 3 📋
- [ ] Sistema de avaliações
- [ ] Chat/Mensagens
- [ ] App mobile (React Native)
- [ ] Integração com APIs externas

---

**Desenvolvido com ❤️ para conectar jovens amazonenses ao mercado de trabalho**