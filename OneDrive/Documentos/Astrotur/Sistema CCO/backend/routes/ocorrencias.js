const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../config/database');

// Mock de dados em memória
let ocorrenciasMemory = [];

// Arquivos de persistência
const ID_FILE = path.join(__dirname, '../data/ocorrencia_counter.json');
const OCORRENCIAS_FILE = path.join(__dirname, '../data/ocorrencias.json');

// Função para carregar ocorrências do arquivo
function loadOcorrencias() {
  try {
    if (fs.existsSync(OCORRENCIAS_FILE)) {
      const data = fs.readFileSync(OCORRENCIAS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Erro ao carregar ocorrências:', error);
  }
  return [];
}

// Função para salvar ocorrências no arquivo
function saveOcorrencias(ocorrencias) {
  try {
    const dir = path.dirname(OCORRENCIAS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(OCORRENCIAS_FILE, JSON.stringify(ocorrencias, null, 2));
  } catch (error) {
    console.error('Erro ao salvar ocorrências:', error);
  }
}

// Carregar ocorrências ao iniciar
ocorrenciasMemory = loadOcorrencias();
console.log(`📦 ${ocorrenciasMemory.length} ocorrência(s) carregada(s) do arquivo`);

// Função para carregar o contador de IDs
function loadIdCounter() {
  try {
    if (fs.existsSync(ID_FILE)) {
      const data = fs.readFileSync(ID_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Erro ao carregar contador de IDs:', error);
  }
  return { lastDate: '', counter: 0 };
}

// Função para salvar o contador de IDs
function saveIdCounter(counterData) {
  try {
    const dir = path.dirname(ID_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(ID_FILE, JSON.stringify(counterData, null, 2));
  } catch (error) {
    console.error('Erro ao salvar contador de IDs:', error);
  }
}

// Função para gerar número único de ocorrência
function gerarNumeroOcorrencia() {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, '0');
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dataFormatada = `${dia}/${mes}`;
  const dataChave = hoje.toISOString().split('T')[0]; // YYYY-MM-DD para o arquivo
  
  let counterData = loadIdCounter();
  
  // Se mudou o dia, reseta o contador
  if (counterData.lastDate !== dataChave) {
    counterData = { lastDate: dataChave, counter: 0 };
  }
  
  // Incrementa o contador
  counterData.counter += 1;
  
  // Salva o novo contador
  saveIdCounter(counterData);
  
  // Retorna no formato: DD/MM-0001
  return `${dataFormatada}-${String(counterData.counter).padStart(4, '0')}`;
}

// Configurar multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|mp4|avi|mov/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não permitido'));
    }
  }
});

// Listar todas as ocorrências
router.get('/', async (req, res) => {
  try {
    let ocorrencias;
    
    try {
      const result = await db.query(`
        SELECT 
          o.*,
          c.nome as cliente_nome,
          v.placa,
          v.modelo,
          tq.nome as tipo_quebra_nome,
          u.nome as criado_por_nome
        FROM ocorrencias o
        LEFT JOIN clientes c ON o.cliente_id = c.id
        LEFT JOIN veiculos v ON o.veiculo_id = v.id
        LEFT JOIN tipos_quebra tq ON o.tipo_quebra_id = tq.id
        LEFT JOIN usuarios u ON o.criado_por = u.id
        ORDER BY o.created_at DESC
      `);
      ocorrencias = result.rows;
    } catch (dbError) {
      console.log('📝 Usando ocorrências da memória (banco indisponível)');
      ocorrencias = ocorrenciasMemory;
    }

    res.json(ocorrencias);
  } catch (error) {
    console.error('Erro ao listar ocorrências:', error);
    res.status(500).json({ message: 'Erro ao listar ocorrências' });
  }
});

// Buscar ocorrência por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let ocorrencia;

    try {
      const result = await db.query(`
        SELECT 
          o.*,
          c.nome as cliente_nome,
          c.contato as cliente_contato,
          v.placa,
          v.modelo,
          tq.nome as tipo_quebra_nome,
          u.nome as criado_por_nome,
          u_aprov.nome as aprovado_por_nome
        FROM ocorrencias o
        LEFT JOIN clientes c ON o.cliente_id = c.id
        LEFT JOIN veiculos v ON o.veiculo_id = v.id
        LEFT JOIN tipos_quebra tq ON o.tipo_quebra_id = tq.id
        LEFT JOIN usuarios u ON o.criado_por = u.id
        LEFT JOIN usuarios u_aprov ON o.aprovado_por = u_aprov.id
        WHERE o.id = $1 OR o.numero_ocorrencia = $1
      `, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Ocorrência não encontrada' });
      }

      // Buscar logs/timeline
      const logs = await db.query(`
        SELECT ol.*, u.nome as usuario_nome
        FROM ocorrencia_logs ol
        LEFT JOIN usuarios u ON ol.usuario_id = u.id
        WHERE ol.ocorrencia_id = $1
        ORDER BY ol.created_at DESC
      `, [id]);

      // Buscar anexos
      const anexos = await db.query(
        'SELECT * FROM ocorrencia_anexos WHERE ocorrencia_id = $1',
        [id]
      );

      ocorrencia = {
        ...result.rows[0],
        timeline: logs.rows,
        anexos: anexos.rows
      };
    } catch (dbError) {
      console.log('📝 Buscando ocorrência da memória');
      // Buscar por ID numérico ou por número de ocorrência
      ocorrencia = ocorrenciasMemory.find(o => 
        o.id == id || o.numero_ocorrencia === id
      );
      if (!ocorrencia) {
        return res.status(404).json({ message: 'Ocorrência não encontrada' });
      }
    }

    res.json(ocorrencia);
  } catch (error) {
    console.error('Erro ao buscar ocorrência:', error);
    res.status(500).json({ message: 'Erro ao buscar ocorrência' });
  }
});

// Criar nova ocorrência
router.post('/', upload.array('anexos', 10), async (req, res) => {
  try {
    const {
      cliente_id,
      cliente_nome,
      monitor_id,
      monitor_nome,
      data_ocorrencia,
      tipo_ocorrencia,
      veiculo_placa,
      houve_troca_veiculo,
      veiculo_substituto_placa,
      horario_socorro,
      horario_saida,
      houve_atraso,
      tempo_atraso,
      descricao,
      status
    } = req.body;

    // Gerar número único de ocorrência
    const numeroOcorrencia = gerarNumeroOcorrencia();

    const novaOcorrencia = {
      id: Date.now(), // ID baseado em timestamp para unicidade
      numero_ocorrencia: numeroOcorrencia,
      cliente_id,
      cliente_nome: cliente_nome || 'N/A',
      monitor_id,
      monitor_nome: monitor_nome || 'N/A',
      data_ocorrencia: data_ocorrencia || new Date().toISOString().split('T')[0],
      tipo_ocorrencia,
      veiculo_placa,
      houve_troca_veiculo,
      veiculo_substituto_placa: houve_troca_veiculo === 'sim' ? veiculo_substituto_placa : null,
      horario_socorro,
      horario_saida,
      houve_atraso,
      tempo_atraso: houve_atraso === 'sim' ? tempo_atraso : null,
      descricao,
      status,
      anexos: req.files ? req.files.map(f => ({
        nome: f.originalname,
        caminho: f.path,
        tamanho: f.size,
        tipo: f.mimetype
      })) : [],
      created_at: new Date()
    };

    // Tentar salvar no banco, se falhar usa memória
    try {
      const result = await db.query(`
        INSERT INTO ocorrencias 
          (numero_ocorrencia, cliente_id, monitor_id, tipo_ocorrencia, veiculo_placa, 
           houve_troca_veiculo, veiculo_substituto_placa, horario_socorro, horario_saida,
           houve_atraso, tempo_atraso, descricao, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING *
      `, [
        novaOcorrencia.numero_ocorrencia, cliente_id, monitor_id, tipo_ocorrencia, 
        veiculo_placa, houve_troca_veiculo, novaOcorrencia.veiculo_substituto_placa,
        horario_socorro, horario_saida, houve_atraso, novaOcorrencia.tempo_atraso,
        descricao, status
      ]);

      // Salvar anexos no banco
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          await db.query(`
            INSERT INTO ocorrencia_anexos (ocorrencia_id, nome, caminho, tamanho, tipo)
            VALUES ($1, $2, $3, $4, $5)
          `, [result.rows[0].id, file.originalname, file.path, file.size, file.mimetype]);
        }
      }

      res.status(201).json(result.rows[0]);
    } catch (dbError) {
      console.log('📝 Salvando ocorrência em memória (banco indisponível)');
      ocorrenciasMemory.push(novaOcorrencia);
      saveOcorrencias(ocorrenciasMemory); // Salvar no arquivo
      res.status(201).json(novaOcorrencia);
    }
  } catch (error) {
    console.error('Erro ao criar ocorrência:', error);
    res.status(500).json({ message: 'Erro ao criar ocorrência' });
  }
});

// Atualizar ocorrência
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    // Atualizar em memória
    const index = ocorrenciasMemory.findIndex(o => o.id == id || o.numero_ocorrencia === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Ocorrência não encontrada' });
    }

    // Atualizar os dados
    ocorrenciasMemory[index] = {
      ...ocorrenciasMemory[index],
      ...dadosAtualizados,
      updated_at: new Date().toISOString()
    };

    // Salvar no arquivo
    saveOcorrencias(ocorrenciasMemory);

    console.log(`✏️ Ocorrência ${id} atualizada`);
    res.json(ocorrenciasMemory[index]);
  } catch (error) {
    console.error('Erro ao atualizar ocorrência:', error);
    res.status(500).json({ message: 'Erro ao atualizar ocorrência' });
  }
});

// Aprovar ocorrência
router.post('/:id/aprovar', async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario_id } = req.body;

    const result = await db.query(`
      UPDATE ocorrencias 
      SET aprovado = true, aprovado_por = $1, data_aprovacao = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `, [usuario_id, id]);

    // Criar log
    await db.query(`
      INSERT INTO ocorrencia_logs (ocorrencia_id, tipo, descricao, usuario_id)
      VALUES ($1, 'aprovacao', 'Ocorrência aprovada', $2)
    `, [id, usuario_id]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao aprovar ocorrência:', error);
    res.status(500).json({ message: 'Erro ao aprovar ocorrência' });
  }
});

// Finalizar plantão e gerar relatório
router.post('/finalizar-plantao', async (req, res) => {
  try {
    const { usuario_id, observacoes } = req.body;
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR');
    
    let ocorrenciasDoDia = [];
    
    // Buscar todas as ocorrências do dia
    try {
      const result = await db.query(`
        SELECT 
          o.*,
          c.nome as cliente_nome,
          u.nome as monitor_nome
        FROM ocorrencias o
        LEFT JOIN clientes c ON o.cliente_id = c.id
        LEFT JOIN usuarios u ON o.monitor_id = u.id
        WHERE DATE(o.data_ocorrencia) = CURRENT_DATE
        ORDER BY o.numero_ocorrencia ASC
      `);
      ocorrenciasDoDia = result.rows;
    } catch (dbError) {
      console.log('📊 Usando ocorrências da memória para relatório');
      const hojeDateString = hoje.toISOString().split('T')[0];
      ocorrenciasDoDia = ocorrenciasMemory.filter(o => 
        o.data_ocorrencia && 
        new Date(o.data_ocorrencia).toISOString().split('T')[0] === hojeDateString
      );
    }

    // Estatísticas do dia
    const totalOcorrencias = ocorrenciasDoDia.length;
    const concluidas = ocorrenciasDoDia.filter(o => o.status === 'concluido').length;
    const emAndamento = ocorrenciasDoDia.filter(o => o.status === 'em_andamento').length;
    const pendentes = ocorrenciasDoDia.filter(o => o.status === 'pendente').length;
    const comAtraso = ocorrenciasDoDia.filter(o => o.houve_atraso === 'sim').length;
    const comTrocaVeiculo = ocorrenciasDoDia.filter(o => o.houve_troca_veiculo === 'sim').length;

    // Gerar relatório
    const relatorio = {
      data: dataFormatada,
      data_geracao: hoje,
      usuario_id,
      observacoes: observacoes || '',
      estatisticas: {
        total_ocorrencias: totalOcorrencias,
        concluidas,
        em_andamento: emAndamento,
        pendentes,
        com_atraso: comAtraso,
        com_troca_veiculo: comTrocaVeiculo
      },
      ocorrencias: ocorrenciasDoDia
    };

    // Salvar relatório em arquivo JSON
    const relatorioFileName = `relatorio-${hoje.toISOString().split('T')[0]}.json`;
    const relatorioPath = path.join(__dirname, '../data/relatorios', relatorioFileName);
    
    try {
      const dirRelatorios = path.dirname(relatorioPath);
      if (!fs.existsSync(dirRelatorios)) {
        fs.mkdirSync(dirRelatorios, { recursive: true });
      }
      fs.writeFileSync(relatorioPath, JSON.stringify(relatorio, null, 2));
      console.log(`✅ Relatório gerado: ${relatorioFileName}`);
    } catch (fileError) {
      console.error('Erro ao salvar relatório:', fileError);
    }

    res.json({
      message: 'Plantão finalizado com sucesso',
      relatorio
    });
  } catch (error) {
    console.error('Erro ao finalizar plantão:', error);
    res.status(500).json({ message: 'Erro ao finalizar plantão' });
  }
});

// Função para acessar ocorrências da memória (usado pelo dashboard)
router.getOcorrenciasMemory = function() {
  return ocorrenciasMemory;
};

module.exports = router;
