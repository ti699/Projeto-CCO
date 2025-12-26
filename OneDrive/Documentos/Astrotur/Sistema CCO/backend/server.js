const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/ocorrencias', require('./routes/ocorrencias'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/veiculos', require('./routes/veiculos'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/relatorios', require('./routes/relatorios'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Sistema CCO API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Erro interno do servidor'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: true, message: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Ambiente: ${process.env.NODE_ENV}`);
});

module.exports = app;
