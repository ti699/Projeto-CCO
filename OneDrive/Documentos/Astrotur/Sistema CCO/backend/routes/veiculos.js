const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Mock de veículos em memória
const veiculosMock = [
  { id: 1, placa: 'ABC-1234', modelo: 'Mercedes Sprinter', ano: 2022, cliente_id: 1, ativo: true },
  { id: 2, placa: 'DEF-5678', modelo: 'Volvo B270F', ano: 2021, cliente_id: 2, ativo: true },
  { id: 3, placa: 'GHI-9012', modelo: 'Marcopolo Volare', ano: 2023, cliente_id: 3, ativo: true },
  { id: 4, placa: 'JKL-3456', modelo: 'Iveco Daily', ano: 2022, cliente_id: 1, ativo: true },
  { id: 5, placa: 'MNO-7890', modelo: 'Scania K360', ano: 2020, cliente_id: 4, ativo: true }
];

router.get('/', async (req, res) => {
  try {
    let veiculos;
    
    try {
      const result = await db.query(
        'SELECT * FROM veiculos WHERE ativo = true ORDER BY placa'
      );
      veiculos = result.rows;
    } catch (dbError) {
      console.log('📝 Usando veículos mockados (banco indisponível)');
      veiculos = veiculosMock;
    }
    
    res.json(veiculos);
  } catch (error) {
    console.error('Erro ao listar veículos:', error);
    res.status(500).json({ message: 'Erro ao listar veículos' });
  }
});

module.exports = router;
