# Plataforma de Cursos - Backend

API RESTful para a plataforma de divulgação de cursos técnicos e profissionalizantes em Manaus/AM.

## 🚀 Tecnologias

- **Node.js** (LTS)
- **Express.js** - Framework web
- **Prisma ORM** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Bcrypt** - Hash de senhas
- **Joi** - Validação de dados

## 📋 Pré-requisitos

- Node.js (versão LTS)
- PostgreSQL (versão 12+)
- npm ou yarn

## ⚙️ Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/plataforma_cursos?schema=public"
JWT_SECRET="seu_jwt_secret_super_seguro_aqui"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV="development"
```

### 3. Configurar banco de dados

```bash
# Gerar cliente Prisma
npm run db:generate

# Aplicar schema ao banco
npm run db:push

# Ou usar migrações (recomendado para produção)
npm run db:migrate

# Popular banco com dados iniciais
npm run db:seed
```

## 🏃‍♂️ Executar

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

O servidor estará disponível em `http://localhost:3001`

## 📚 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Perfil do usuário autenticado

### Cursos (Público)
- `GET /api/courses` - Listar cursos (com filtros)
- `GET /api/courses/:id` - Detalhes do curso
- `GET /api/courses/categories` - Listar categorias

### Oportunidades (Público)
- `GET /api/opportunities` - Listar oportunidades

### Blog (Público)
- `GET /api/blog` - Listar postagens
- `GET /api/blog/:slug` - Visualizar postagem

### Estudante (Autenticado)
- `POST /api/courses/:id/enroll` - Matricular-se em curso
- `POST /api/opportunities/:id/apply` - Candidatar-se a oportunidade
- `GET /api/student/dashboard` - Dashboard do estudante

### Instituição (Autenticado)
- `POST /api/institution/courses` - Criar curso
- `PUT /api/institution/courses/:id` - Atualizar curso
- `DELETE /api/institution/courses/:id` - Remover curso
- `POST /api/institution/opportunities` - Criar oportunidade
- `PUT /api/institution/opportunities/:id` - Atualizar oportunidade
- `DELETE /api/institution/opportunities/:id` - Remover oportunidade

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Inclua o token no header:

```
Authorization: Bearer <seu_token_jwt>
```

## 👥 Usuários de Teste

Após executar o seed, você terá os seguintes usuários:

- **Admin**: admin@plataforma.com / admin123
- **Instituição**: senai@exemplo.com / instituicao123
- **Estudante**: joao@exemplo.com / estudante123

## 🗄️ Estrutura do Banco

O banco segue o esquema PostgreSQL fornecido, com as seguintes entidades principais:

- `usuarios` - Usuários do sistema
- `perfis_estudante` - Perfis de estudantes
- `perfis_instituicao` - Perfis de instituições
- `cursos` - Cursos oferecidos
- `categorias_curso` - Categorias dos cursos
- `oportunidades` - Vagas de emprego/estágio
- `matriculas` - Inscrições em cursos
- `candidaturas` - Candidaturas a oportunidades
- `postagens_blog` - Artigos do blog

## 🛠️ Scripts Disponíveis

- `npm start` - Executar em produção
- `npm run dev` - Executar em desenvolvimento
- `npm run db:generate` - Gerar cliente Prisma
- `npm run db:push` - Aplicar schema ao banco
- `npm run db:migrate` - Executar migrações
- `npm run db:seed` - Popular banco com dados iniciais

## 📝 Logs

Em desenvolvimento, o Prisma registra todas as queries SQL. Em produção, apenas erros são registrados.

## 🔒 Segurança

- Senhas são hasheadas com bcrypt (salt rounds: 12)
- JWT com expiração configurável
- Validação de dados com Joi
- Headers de segurança com Helmet
- CORS configurado