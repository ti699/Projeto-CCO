import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../services/api';

const EditarOcorrencia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [anexos, setAnexos] = useState([]);
  
  const [formData, setFormData] = useState({
    cliente_nome: '',
    cliente_outro: '',
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
    '51 MULLER', 'ACHÊ', 'AMANCO', 'AMCOR', 'CAMPARI', 'CBA', 'CONSAG', 'CRISTALPET',
    'DECAL', 'HDH', 'HOTEL VIVÁ', 'INBETTA', 'JCPM', 'JEEP', 'MANUTENÇÃO', 'MARELLI',
    'MASTERFOOD', 'MERCADO LIVRE', 'MONTE RODOVIAS', 'MOURA', 'N/A', 'OMIRP',
    'OPERAÇÃO', 'PIATEC', 'RESERVA', 'SERVIÇOS', 'TECON', 'TURISMO', 'VILA GALÉ'
  ];

  const monitoresPredefinidos = ['ANDERSON', 'IRANILDO', 'KLAYTON', 'VALDOMIRO'];

  const veiculosComClientes = [
    { numero: '101', cliente: '51 MULLER' }, { numero: '102', cliente: '51 MULLER' },
    { numero: '201', cliente: 'ACHÊ' }, { numero: '202', cliente: 'ACHÊ' },
    { numero: '301', cliente: 'AMANCO' }, { numero: '401', cliente: 'AMCOR' },
    { numero: '402', cliente: 'AMCOR' }, { numero: '501', cliente: 'CAMPARI' },
    { numero: '601', cliente: 'CBA' }, { numero: '602', cliente: 'CBA' },
    { numero: '603', cliente: 'CBA' }, { numero: '701', cliente: 'CONSAG' },
    { numero: '801', cliente: 'CRISTALPET' }, { numero: '802', cliente: 'CRISTALPET' },
    { numero: '901', cliente: 'DECAL' }, { numero: '1001', cliente: 'HDH' },
    { numero: '1101', cliente: 'HOTEL VIVÁ' }, { numero: '1102', cliente: 'HOTEL VIVÁ' },
    { numero: '1201', cliente: 'INBETTA' }, { numero: '1301', cliente: 'JCPM' },
    { numero: '1401', cliente: 'JEEP' }, { numero: '1402', cliente: 'JEEP' },
    { numero: '1403', cliente: 'JEEP' }, { numero: '1501', cliente: 'MARELLI' },
    { numero: '1502', cliente: 'MARELLI' }, { numero: '1601', cliente: 'MASTERFOOD' },
    { numero: '1701', cliente: 'MERCADO LIVRE' }, { numero: '1702', cliente: 'MERCADO LIVRE' },
    { numero: '1801', cliente: 'MONTE RODOVIAS' }, { numero: '1802', cliente: 'MONTE RODOVIAS' },
    { numero: '1803', cliente: 'MONTE RODOVIAS' }, { numero: '1901', cliente: 'MOURA' },
    { numero: '2001', cliente: 'OMIRP' }, { numero: '2101', cliente: 'PIATEC' },
    { numero: '2201', cliente: 'TECON' }, { numero: '2202', cliente: 'TECON' },
    { numero: '2301', cliente: 'TURISMO' }, { numero: '2302', cliente: 'TURISMO' },
    { numero: '2401', cliente: 'VILA GALÉ' }, { numero: '2402', cliente: 'VILA GALÉ' }
  ];

  useEffect(() => {
    carregarOcorrencia();
  }, [id]);

  const carregarOcorrencia = async () => {
    try {
      setLoadingData(true);
      const response = await api.get(`/ocorrencias/${id}`);
      const ocorrencia = response.data;
      
      setFormData({
        cliente_nome: ocorrencia.cliente_nome || '',
        cliente_outro: '',
        monitor_nome: ocorrencia.monitor_nome || '',
        data_ocorrencia: ocorrencia.data_ocorrencia || '',
        tipo_ocorrencia: ocorrencia.tipo_ocorrencia || '',
        veiculo_placa: ocorrencia.veiculo_placa || '',
        houve_troca_veiculo: ocorrencia.houve_troca_veiculo || 'nao',
        veiculo_substituto_placa: ocorrencia.veiculo_substituto_placa || '',
        horario_socorro: ocorrencia.horario_socorro || '',
        horario_saida: ocorrencia.horario_saida || '',
        houve_atraso: ocorrencia.houve_atraso || 'nao',
        tempo_atraso: ocorrencia.tempo_atraso || '',
        descricao: ocorrencia.descricao || '',
        status: ocorrencia.status || 'pendente',
      });
    } catch (error) {
      console.error('Erro ao carregar ocorrência:', error);
      toast.error('Erro ao carregar dados da ocorrência');
      navigate('/ocorrencias');
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'veiculo_placa') {
      const veiculoSelecionado = veiculosComClientes.find(v => v.numero === value);
      if (veiculoSelecionado) {
        setFormData(prev => ({ 
          ...prev, 
          [name]: value,
          cliente_nome: veiculoSelecionado.cliente,
          cliente_outro: ''
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
      const dadosParaAtualizar = {
        ...formData,
        cliente_nome: formData.cliente_nome === 'Outros' ? formData.cliente_outro : formData.cliente_nome
      };

      await api.put(`/ocorrencias/${id}`, dadosParaAtualizar);
      
      toast.success('Ocorrência atualizada com sucesso!');
      navigate(`/ocorrencias/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao atualizar ocorrência');
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(`/ocorrencias/${id}`)}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Editar Ocorrência</h1>
          <p className="text-gray-500">Atualize as informações da ocorrência</p>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tempo de Atraso *</label>
                <input type="text" name="tempo_atraso" value={formData.tempo_atraso} onChange={handleChange} required={formData.houve_atraso === 'sim'} placeholder="Ex: 30 minutos" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
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

        <div className="flex gap-4 justify-end">
          <button type="button" onClick={() => navigate(`/ocorrencias/${id}`)} className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition">
            Cancelar
          </button>
          <button type="submit" disabled={loading} className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <Save size={20} />
            {loading ? 'Salvando...' : 'Atualizar Ocorrência'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarOcorrencia;
