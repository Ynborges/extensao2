require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Importar rotas
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const opportunityRoutes = require('./routes/opportunities');
const blogRoutes = require('./routes/blog');
const studentRoutes = require('./routes/student');
const institutionRoutes = require('./routes/institution');

const app = express();
const PORT = process.env.PORT || 3001;

// Para Vercel
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/institution', institutionRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
  });
}

module.exports = app;