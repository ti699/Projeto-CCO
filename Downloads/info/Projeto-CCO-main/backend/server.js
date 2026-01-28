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

// Função para verificar e adicionar colunas faltantes
const verificarEstruturaBanco = async () => {
  const db = require('./config/database');
  
  try {
    console.log('🔍 Verificando estrutura do banco de dados...');
    
    // Verificar se sla_nivel existe
    const checkSla = await db.query(`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name='clientes' AND column_name='sla_nivel'
    `);
    
    if (checkSla.rows.length === 0) {
      console.log('📝 Adicionando coluna sla_nivel...');
      await db.query(`ALTER TABLE clientes ADD COLUMN sla_nivel VARCHAR(20) DEFAULT 'ALTO'`);
    }
    
    // Verificar se prioridade_1 existe
    const checkP1 = await db.query(`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name='clientes' AND column_name='prioridade_1'
    `);
    
    if (checkP1.rows.length === 0) {
      console.log('📝 Adicionando coluna prioridade_1...');
      await db.query(`ALTER TABLE clientes ADD COLUMN prioridade_1 VARCHAR(20) DEFAULT 'WHATSAPP'`);
    }
    
    // Verificar se prioridade_2 existe
    const checkP2 = await db.query(`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name='clientes' AND column_name='prioridade_2'
    `);
    
    if (checkP2.rows.length === 0) {
      console.log('📝 Adicionando coluna prioridade_2...');
      await db.query(`ALTER TABLE clientes ADD COLUMN prioridade_2 VARCHAR(20) DEFAULT 'LIGAÇÃO'`);
    }
    
    // Verificar se prioridade_3 existe
    const checkP3 = await db.query(`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name='clientes' AND column_name='prioridade_3'
    `);
    
    if (checkP3.rows.length === 0) {
      console.log('📝 Adicionando coluna prioridade_3...');
      await db.query(`ALTER TABLE clientes ADD COLUMN prioridade_3 VARCHAR(20) DEFAULT 'E-MAIL'`);
    }
    
    // Verificar se ano_frota existe
    const checkAno = await db.query(`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name='clientes' AND column_name='ano_frota'
    `);
    
    if (checkAno.rows.length === 0) {
      console.log('📝 Adicionando coluna ano_frota...');
      await db.query(`ALTER TABLE clientes ADD COLUMN ano_frota VARCHAR(50)`);
    }
    
    // Verificar se telefone existe
    const checkTelefone = await db.query(`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name='clientes' AND column_name='telefone'
    `);
    
    if (checkTelefone.rows.length === 0) {
      console.log('📝 Adicionando coluna telefone...');
      await db.query(`ALTER TABLE clientes ADD COLUMN telefone VARCHAR(20)`);
    }
    
    // Verificar se nome_contato existe
    const checkNomeContato = await db.query(`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name='clientes' AND column_name='nome_contato'
    `);
    
    if (checkNomeContato.rows.length === 0) {
      console.log('📝 Adicionando coluna nome_contato...');
      await db.query(`ALTER TABLE clientes ADD COLUMN nome_contato VARCHAR(100)`);
    }
    
    console.log('✅ Estrutura do banco verificada e atualizada');
  } catch (error) {
    console.log('⚠️ Aviso ao verificar banco:', error.message);
  }
};

app.listen(PORT, async () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Ambiente: ${process.env.NODE_ENV}`);
  
  // Verificar e atualizar estrutura do banco
  await verificarEstruturaBanco();
});

module.exports = app;
