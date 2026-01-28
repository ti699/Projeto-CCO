const express = require('express');
const router = express.Router();
const db = require('../config/database');
const bcrypt = require('bcryptjs');
const usersMemoryStore = require('../data/usuarios-memory');

// Listar usuários
router.get('/', async (req, res) => {
  try {
    let usuarios;
    
    try {
      const result = await db.query(
        'SELECT id, nome, email, perfil, cargo, ativo FROM usuarios WHERE ativo = true ORDER BY nome'
      );
      usuarios = result.rows;
    } catch (dbError) {
      console.log('📝 Usando usuários mockados (banco indisponível)');
      usuarios = usersMemoryStore.getUsers().filter(u => u.ativo);
    }
    
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ message: 'Erro ao listar usuários' });
  }
});

// Criar usuário
router.post('/', async (req, res) => {
  try {
    const { nome, email, senha, cargo, perfil } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'Campos obrigatórios: nome, email, senha' });
    }

    try {
      // Verificar se email já existe
      const existente = await db.query('SELECT id FROM usuarios WHERE email = $1', [email]);
      
      if (existente.rows.length > 0) {
        return res.status(400).json({ message: 'Email já cadastrado' });
      }

      // Hash da senha
      const senhaHash = await bcrypt.hash(senha, 10);

      const result = await db.query(
        `INSERT INTO usuarios (nome, email, senha, cargo, perfil, ativo) 
         VALUES ($1, $2, $3, $4, $5, true) 
         RETURNING id, nome, email, perfil, cargo, ativo`,
        [nome, email, senhaHash, cargo, perfil || 'monitor']
      );

      res.status(201).json(result.rows[0]);
    } catch (dbError) {
      console.log('📝 Usando mock (banco indisponível) - criando usuário');
      
      // Verificar duplicata no mock
      if (usersMemoryStore.findByEmail(email)) {
        return res.status(400).json({ message: 'Email já cadastrado' });
      }

      const senhaHash = await bcrypt.hash(senha, 10);
      const novoUsuario = usersMemoryStore.addUser({
        nome,
        email,
        senha: senhaHash,
        perfil: perfil || 'monitor',
        cargo: cargo || ''
      });
      
      // Remover senha da resposta
      const { senha: _, ...usuarioSemSenha } = novoUsuario;
      res.status(201).json(usuarioSemSenha);
    }
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
});

// Atualizar usuário
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha, cargo, perfil } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ message: 'Campos obrigatórios: nome, email' });
    }

    try {
      let query, params;

      if (senha) {
        const senhaHash = await bcrypt.hash(senha, 10);
        query = `UPDATE usuarios 
                 SET nome = $1, email = $2, senha = $3, cargo = $4, perfil = $5 
                 WHERE id = $6 
                 RETURNING id, nome, email, perfil, cargo, ativo`;
        params = [nome, email, senhaHash, cargo, perfil, id];
      } else {
        query = `UPDATE usuarios 
                 SET nome = $1, email = $2, cargo = $3, perfil = $4 
                 WHERE id = $5 
                 RETURNING id, nome, email, perfil, cargo, ativo`;
        params = [nome, email, cargo, perfil, id];
      }

      const result = await db.query(query, params);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.json(result.rows[0]);
    } catch (dbError) {
      console.log('📝 Usando mock (banco indisponível) - atualizando usuário');
      
      const updateData = {
        nome,
        email,
        cargo: cargo || '',
        perfil: perfil || 'monitor'
      };

      if (senha) {
        const senhaHash = await bcrypt.hash(senha, 10);
        updateData.senha = senhaHash;
      }

      const usuarioAtualizado = usersMemoryStore.updateUser(id, updateData);
      
      if (!usuarioAtualizado) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Remover senha da resposta
      const { senha: _, ...usuarioSemSenha } = usuarioAtualizado;
      res.json(usuarioSemSenha);
    }
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
});

// Excluir usuário
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    try {
      const result = await db.query(
        'UPDATE usuarios SET ativo = false WHERE id = $1 RETURNING id',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.json({ message: 'Usuário excluído com sucesso' });
    } catch (dbError) {
      console.log('📝 Usando mock (banco indisponível) - excluindo usuário');
      
      const deleted = usersMemoryStore.deleteUser(id);
      
      if (!deleted) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.json({ message: 'Usuário excluído com sucesso' });
    }
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ message: 'Erro ao excluir usuário' });
  }
});

module.exports = router;
