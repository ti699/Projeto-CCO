const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'sistema_cco',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

pool.on('connect', () => {
  console.log('✅ Conectado ao PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Erro no PostgreSQL:', err.message);
});

// Testar conexão ao iniciar
pool.query('SELECT NOW()')
  .then(() => {
    console.log('✅ PostgreSQL: Conexão testada com sucesso');
  })
  .catch((err) => {
    console.error('⚠️ PostgreSQL não está disponível:', err.message);
    console.log('📝 Sistema funcionará em modo memória/arquivo');
  });

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
