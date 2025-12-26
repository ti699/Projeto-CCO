import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../services/api';

const NovaOcorrencia = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [monitores, setMonitores] = useState([]);
  const [anexos, setAnexos] = useState([]);
  
  const [formData, setFormData] = useState({
    cliente_id: '',
    cliente_nome: '',
    cliente_outro: '',
    monitor_id: '',
    monitor_nome: '',
    data_ocorrencia: '',
    tipo_ocorrencia: '',
    veiculo_placa: '',
    houve_troca_veiculo: 'nao',
    veiculo_substituto_placa: '',
    horario_socorro: '',
    horario_saida: '',
    houve_atraso: 'nao',
    tempo_atraso: '',
    descricao: '',
    status: 'pendente',
  });

  const clientesPredefinidos = [
    '51 MULLER',
    'ACHÊ',
    'AMANCO',
    'AMCOR',
    'CAMPARI',
    'CBA',
    'CONSAG',
    'CRISTALPET',
    'DECAL',
    'HDH',
    'HOTEL VIVÁ',
    'INBETTA',
    'JCPM',
    'JEEP',
    'MANUTENÇÃO',
    'MARELLI',
    'MASTERFOOD',
    'MERCADO LIVRE',
    'MONTE RODOVIAS',
    'MOURA',
    'N/A',
    'OMIRP',
    'OPERAÇÃO',
    'PIATEC',
    'RESERVA',
    'SERVIÇOS',
    'TECON',
    'TURISMO',
    'VILA GALÉ'
  ];

  const monitoresPredefinidos = [
    'ANDERSON',
    'IRANILDO',
    'KLAYTON',
    'VALDOMIRO'
  ];

  // Veículos com clientes atribuídos
  const veiculosComClientes = [
    // 51 MULLER
    { numero: '101', cliente: '51 MULLER' },
    { numero: '102', cliente: '51 MULLER' },
    
    // ACHÊ
    { numero: '201', cliente: 'ACHÊ' },
    { numero: '202', cliente: 'ACHÊ' },
    
    // AMANCO
    { numero: '301', cliente: 'AMANCO' },
    
    // AMCOR
    { numero: '401', cliente: 'AMCOR' },
    { numero: '402', cliente: 'AMCOR' },
    
    // CAMPARI
    { numero: '501', cliente: 'CAMPARI' },
    
    // CBA
    { numero: '601', cliente: 'CBA' },
    { numero: '602', cliente: 'CBA' },
    { numero: '603', cliente: 'CBA' },
    
    // CONSAG
    { numero: '701', cliente: 'CONSAG' },
    
    // CRISTALPET
    { numero: '801', cliente: 'CRISTALPET' },
    { numero: '802', cliente: 'CRISTALPET' },
    
    // DECAL
    { numero: '901', cliente: 'DECAL' },
    
    // HDH
    { numero: '1001', cliente: 'HDH' },
    
    // HOTEL VIVÁ
    { numero: '1101', cliente: 'HOTEL VIVÁ' },
    { numero: '1102', cliente: 'HOTEL VIVÁ' },
    
    // INBETTA
    { numero: '1201', cliente: 'INBETTA' },
    
    // JCPM
    { numero: '1301', cliente: 'JCPM' },
    
    // JEEP
    { numero: '1401', cliente: 'JEEP' },
    { numero: '1402', cliente: 'JEEP' },
    { numero: '1403', cliente: 'JEEP' },
    
    // MARELLI
    { numero: '1501', cliente: 'MARELLI' },
    { numero: '1502', cliente: 'MARELLI' },
    
    // MASTERFOOD
    { numero: '1601', cliente: 'MASTERFOOD' },
    
    // MERCADO LIVRE
    { numero: '1701', cliente: 'MERCADO LIVRE' },
    { numero: '1702', cliente: 'MERCADO LIVRE' },
    
    // MONTE RODOVIAS
    { numero: '1801', cliente: 'MONTE RODOVIAS' },
    { numero: '1802', cliente: 'MONTE RODOVIAS' },
    { numero: '1803', cliente: 'MONTE RODOVIAS' },
    
    // MOURA
    { numero: '1901', cliente: 'MOURA' },
    
    // OMIRP
    { numero: '2001', cliente: 'OMIRP' },
    
    // PIATEC
    { numero: '2101', cliente: 'PIATEC' },
    
    // TECON
    { numero: '2201', cliente: 'TECON' },
    { numero: '2202', cliente: 'TECON' },
    
    // TURISMO
    { numero: '2301', cliente: 'TURISMO' },
    { numero: '2302', cliente: 'TURISMO' },
    
    // VILA GALÉ
    { numero: '2401', cliente: 'VILA GALÉ' },
    { numero: '2402', cliente: 'VILA GALÉ' }
  ];

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [clientesRes, usuariosRes] = await Promise.all([
        api.get('/clientes'),
        api.get('/usuarios')
      ]);
      
      setClientes(clientesRes.data);
      setMonitores(usuariosRes.data.filter(u => u.perfil === 'monitor' || u.perfil === 'administrador'));
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Se mudou o veículo, atualiza automaticamente o cliente
    if (name === 'veiculo_placa') {
      const veiculoSelecionado = veiculosComClientes.find(v => v.numero === value);
      if (veiculoSelecionado) {
        setFormData(prev => ({ 
          ...prev, 
          [name]: value,
          cliente_nome: veiculoSelecionado.cliente,
          cliente_outro: '' // Limpa o campo "outros" se estava preenchido
        }));
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAnexos(prev => [...prev, ...files]);
  };

  const removeAnexo = (index) => {
    setAnexos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Define o nome do cliente baseado na seleção
      const clienteFinal = formData.cliente_nome === 'Outros' 
        ? formData.cliente_outro 
        : formData.cliente_nome;
      
      Object.keys(formData).forEach(key => {
        if (key === 'cliente_nome' || key === 'cliente_outro' || key === 'cliente_id' || key === 'monitor_id' || key === 'monitor_nome') return;
        formDataToSend.append(key, formData[key]);
      });
      
      // Adiciona o cliente e monitor final
      formDataToSend.append('cliente_nome', clienteFinal);
      formDataToSend.append('monitor_nome', formData.monitor_nome);

      anexos.forEach((file) => {
        formDataToSend.append('anexos', file);
      });

      await api.post('/ocorrencias', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('Ocorrência registrada com sucesso!');
      navigate('/ocorrencias');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao registrar ocorrência');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/ocorrencias')}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Registrar Ocorrência</h1>
          <p className="text-gray-500">Preencha as informações da ocorrência operacional</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Informações Básicas</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cliente * 
                {formData.veiculo_placa && (
                  <span className="text-xs text-green-600 ml-2">(preenchido automaticamente)</span>
                )}
              </label>
              <select 
                name="cliente_nome" 
                value={formData.cliente_nome} 
                onChange={handleChange} 
                required 
                disabled={!!formData.veiculo_placa}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  formData.veiculo_placa ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              >
                <option value="">Selecione o cliente</option>
                {clientesPredefinidos.map(cliente => (
                  <option key={cliente} value={cliente}>{cliente}</option>
                ))}
                <option value="Outros">Outros</option>
              </select>
            </div>

            {formData.cliente_nome === 'Outros' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome do Cliente *</label>
                <input
                  type="text"
                  name="cliente_outro"
                  value={formData.cliente_outro}
                  onChange={handleChange}
                  required
                  placeholder="Digite o nome do cliente"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Monitor Responsável *</label>
              <select 
                name="monitor_nome" 
                value={formData.monitor_nome} 
                onChange={handleChange} 
                required 
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Selecione o monitor</option>
                {monitoresPredefinidos.map(monitor => (
                  <option key={monitor} value={monitor}>{monitor}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Data da Ocorrência *</label>
              <input
                type="date"
                name="data_ocorrencia"
                value={formData.data_ocorrencia}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Ocorrência *</label>
              <select name="tipo_ocorrencia" value={formData.tipo_ocorrencia} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="">Selecione o tipo</option>
                <option value="Falha">Falha</option>
                <option value="Quebra">Quebra</option>
                <option value="Atraso">Atraso</option>
                <option value="Suspensão">Suspensão</option>
                <option value="Motor">Motor</option>
                <option value="Elétrica">Elétrica</option>
                <option value="Lubrificação">Lubrificação</option>
                <option value="Pneu">Pneu</option>
                <option value="Ar Condicionado">Ar Condicionado</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status *</label>
              <select name="status" value={formData.status} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="pendente">Pendente</option>
                <option value="em_andamento">Em Andamento</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Informações do Veículo</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Dica:</strong> Ao selecionar o veículo, o cliente será preenchido automaticamente
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Veículo (Numeração) *</label>
              <select 
                name="veiculo_placa" 
                value={formData.veiculo_placa} 
                onChange={handleChange} 
                required 
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Selecione o veículo</option>
                {veiculosComClientes.map(veiculo => (
                  <option key={veiculo.numero} value={veiculo.numero}>
                    {veiculo.numero} - {veiculo.cliente}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Houve troca de veículo? *</label>
              <select name="houve_troca_veiculo" value={formData.houve_troca_veiculo} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </select>
            </div>

            {formData.houve_troca_veiculo === 'sim' && (
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Placa do Veículo Substituto *</label>
                <input type="text" name="veiculo_substituto_placa" value={formData.veiculo_substituto_placa} onChange={handleChange} required={formData.houve_troca_veiculo === 'sim'} placeholder="DEF-5678" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Horários</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Horário do Socorro *</label>
              <input type="time" name="horario_socorro" value={formData.horario_socorro} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Horário da Saída *</label>
              <input type="time" name="horario_saida" value={formData.horario_saida} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Houve atraso? *</label>
              <select name="houve_atraso" value={formData.houve_atraso} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </select>
            </div>

            {formData.houve_atraso === 'sim' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tempo de Atraso (em minutos) *</label>
                <input type="number" name="tempo_atraso" value={formData.tempo_atraso} onChange={handleChange} required={formData.houve_atraso === 'sim'} placeholder="Ex: 30" min="0" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Detalhes da Ocorrência</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição do que houve *</label>
            <textarea name="descricao" value={formData.descricao} onChange={handleChange} required rows="6" placeholder="Descreva em detalhes o que aconteceu, causa do problema, ações tomadas, etc." className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Anexos</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Adicionar fotos, documentos ou arquivos</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600 mb-2">Arraste arquivos aqui ou clique para selecionar</p>
              <p className="text-sm text-gray-400 mb-4">PDF, Imagens, Vídeos (máx. 10MB cada)</p>
              <input type="file" multiple accept="image/*,application/pdf,video/*" onChange={handleFileChange} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="bg-red-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-red-700 transition inline-block">
                Selecionar Arquivos
              </label>
            </div>

            {anexos.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-semibold text-gray-700">Arquivos selecionados:</p>
                {anexos.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-100 p-2 rounded">
                        <Upload size={16} className="text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => removeAnexo(index)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition">
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button type="button" onClick={() => navigate('/ocorrencias')} className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition">
            Cancelar
          </button>
          <button type="submit" disabled={loading} className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <Save size={20} />
            {loading ? 'Salvando...' : 'Salvar Ocorrência'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NovaOcorrencia;
