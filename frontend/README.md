# Plataforma de Cursos - Frontend

Interface web moderna e responsiva para a plataforma de divulgação de cursos técnicos e profissionalizantes em Manaus/AM.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento
- **Tailwind CSS** - Framework CSS utilitário
- **React Query** - Gerenciamento de estado servidor
- **React Hook Form** - Formulários performáticos
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones
- **React Hot Toast** - Notificações

## 📋 Pré-requisitos

- Node.js (versão LTS)
- npm ou yarn
- Backend da aplicação rodando

## ⚙️ Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` se necessário:

```env
VITE_API_URL=http://localhost:3001/api
```

### 3. Executar em desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🏗️ Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

Para visualizar o build:

```bash
npm run preview
```

## 📱 Funcionalidades

### Páginas Públicas
- **Home** - Apresentação da plataforma com cursos em destaque
- **Catálogo de Cursos** - Lista de cursos com filtros avançados
- **Detalhes do Curso** - Informações completas do curso
- **Login/Cadastro** - Autenticação de usuários

### Área do Estudante
- **Dashboard** - Visão geral dos cursos e candidaturas
- **Inscrição em Cursos** - Marcar interesse em cursos
- **Candidaturas** - Aplicar para oportunidades

### Área da Instituição
- **Dashboard** - Gerenciar cursos e oportunidades
- **CRUD de Cursos** - Criar, editar e remover cursos
- **CRUD de Oportunidades** - Gerenciar vagas

## 🎨 Design System

### Cores Principais
- **Primary**: Azul (#3b82f6)
- **Secondary**: Verde (#10b981)
- **Gray**: Tons de cinza para textos e backgrounds

### Componentes Reutilizáveis
- `Navbar` - Navegação principal
- `Footer` - Rodapé com links
- `CourseCard` - Card de curso
- `FilterSidebar` - Filtros de busca
- `ProtectedRoute` - Proteção de rotas

### Classes CSS Utilitárias
- `.btn-primary` - Botão principal
- `.btn-secondary` - Botão secundário
- `.card` - Container com sombra
- `.input-field` - Campo de entrada

## 🔐 Autenticação

O sistema utiliza JWT tokens armazenados no localStorage. O contexto `AuthContext` gerencia o estado de autenticação globalmente.

### Tipos de Usuário
- **Estudante** - Pode se inscrever em cursos e candidatar-se a oportunidades
- **Instituição** - Pode criar e gerenciar cursos e oportunidades
- **Admin** - Acesso completo ao sistema

## 📊 Gerenciamento de Estado

- **React Query** - Cache e sincronização de dados do servidor
- **React Context** - Estado global de autenticação
- **React Hook Form** - Estado de formulários

## 🛠️ Scripts Disponíveis

- `npm run dev` - Executar em desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Visualizar build de produção
- `npm run lint` - Verificar código com ESLint

## 📱 Responsividade

A aplicação é totalmente responsiva, utilizando:
- **Mobile First** - Design otimizado para dispositivos móveis
- **Breakpoints Tailwind** - sm, md, lg, xl
- **Grid System** - Layout flexível com CSS Grid e Flexbox

## 🔍 SEO e Acessibilidade

- **Meta tags** otimizadas para Manaus/AM
- **Semantic HTML** - Estrutura semântica
- **ARIA labels** - Acessibilidade para leitores de tela
- **Keyboard navigation** - Navegação por teclado

## 🚀 Deploy

### Netlify/Vercel
1. Conecte o repositório
2. Configure as variáveis de ambiente
3. Build command: `npm run build`
4. Publish directory: `dist`

### Servidor próprio
1. Execute `npm run build`
2. Sirva os arquivos da pasta `dist/`
3. Configure proxy para `/api` apontar para o backend

## 🧪 Estrutura de Pastas

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── hooks/         # Hooks customizados
├── services/      # Serviços de API
├── contexts/      # Contextos React
├── utils/         # Utilitários
└── main.jsx       # Ponto de entrada
```

## 🎯 Próximas Funcionalidades

- [ ] Página de Oportunidades completa
- [ ] Blog com artigos
- [ ] Dashboard da Instituição
- [ ] Painel Administrativo
- [ ] Sistema de notificações
- [ ] Chat/Mensagens
- [ ] Upload de arquivos
- [ ] PWA (Progressive Web App)