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

  // Lista completa de todos os veículos disponíveis
  const todosVeiculos = [
    // RESERVA
    { prefixo: '1704', cliente: 'RESERVA', tipo: 'MICRO' },
    { prefixo: '2020', cliente: 'RESERVA', tipo: 'VAN' },
    { prefixo: '101231', cliente: 'RESERVA', tipo: 'ÔNIBUS' },
    { prefixo: '101252', cliente: 'RESERVA', tipo: 'ÔNIBUS' },
    { prefixo: '101318', cliente: 'RESERVA', tipo: 'ÔNIBUS' },
    { prefixo: '101320', cliente: 'RESERVA', tipo: 'ÔNIBUS' },
    { prefixo: '101716', cliente: 'RESERVA', tipo: 'ÔNIBUS' },
    { prefixo: '102308', cliente: 'RESERVA', tipo: 'ÔNIBUS' },
    { prefixo: '121908', cliente: 'RESERVA', tipo: 'ÔNIBUS' },
    { prefixo: '121922', cliente: 'RESERVA', tipo: 'ÔNIBUS' },
    // CARREFOUR
    { prefixo: '956', cliente: 'CARREFOUR', tipo: 'VAN' },
    { prefixo: '1203', cliente: 'CARREFOUR', tipo: 'MICRO' },
    { prefixo: '1702', cliente: 'CARREFOUR', tipo: 'MICRO' },
    // JEEP
    { prefixo: '1397', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '101236', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '101244', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '101246', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '101250', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '101256', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '101720', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '102104', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '102206', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '102306', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '102512', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '121301', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '121902', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '121904', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '121906', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '121910', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '121912', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '121914', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '121916', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '121918', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '121920', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '121924', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '121926', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '121930', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '121932', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '121934', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '121936', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '122106', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '122108', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    { prefixo: '122110', cliente: 'JEEP', tipo: 'ÔNIBUS' },
    // CONSAG
    { prefixo: '102010', cliente: 'CONSAG', tipo: 'ÔNIBUS' },
    { prefixo: '102016', cliente: 'CONSAG', tipo: 'ÔNIBUS' },
    { prefixo: '102102', cliente: 'CONSAG', tipo: 'ÔNIBUS' },
    { prefixo: '102210', cliente: 'CONSAG', tipo: 'ÔNIBUS' },
    { prefixo: '102304', cliente: 'CONSAG', tipo: 'ÔNIBUS' },
    { prefixo: '121502', cliente: 'CONSAG', tipo: 'ÔNIBUS' },
    { prefixo: '121602', cliente: 'CONSAG', tipo: 'ÔNIBUS' },
    { prefixo: '121604', cliente: 'CONSAG', tipo: 'ÔNIBUS' },
    { prefixo: '121606', cliente: 'CONSAG', tipo: 'ÔNIBUS' },
    { prefixo: '122414', cliente: 'CONSAG', tipo: 'ÔNIBUS' },
    // CBA
    { prefixo: '2002', cliente: 'CBA', tipo: 'ÔNIBUS' },
    { prefixo: '2006', cliente: 'CBA', tipo: 'ÔNIBUS' },
    { prefixo: '2024', cliente: 'CBA', tipo: 'MICRO' },
    { prefixo: '2214', cliente: 'CBA', tipo: 'MICRO' },
    { prefixo: '2406', cliente: 'CBA', tipo: 'MICRO' },
    { prefixo: '102504', cliente: 'CBA', tipo: 'ÔNIBUS' },
    { prefixo: '102506', cliente: 'CBA', tipo: 'ÔNIBUS' },
    // PIACENTINI
    { prefixo: '2208', cliente: 'PIACENTINI', tipo: 'MICRO' },
    { prefixo: '102202', cliente: 'PIACENTINI', tipo: 'ÔNIBUS' },
    { prefixo: '102208', cliente: 'PIACENTINI', tipo: 'ÔNIBUS' },
    { prefixo: '122412', cliente: 'PIACENTINI', tipo: 'ÔNIBUS' },
    // VIVÁ/SOLAR
    { prefixo: '402', cliente: 'VIVÁ/SOLAR', tipo: 'VAN' },
    { prefixo: '424', cliente: 'VIVÁ/SOLAR', tipo: 'VAN' },
    { prefixo: '102310', cliente: 'VIVÁ/SOLAR', tipo: 'ÔNIBUS' },
    { prefixo: '122112', cliente: 'VIVÁ/SOLAR', tipo: 'ÔNIBUS' },
    { prefixo: '122416', cliente: 'VIVÁ/SOLAR', tipo: 'ÔNIBUS' },
    { prefixo: '122418', cliente: 'VIVÁ/SOLAR', tipo: 'ÔNIBUS' },
    // MERCADO LIVRE
    { prefixo: '102012', cliente: 'MERCADO LIVRE', tipo: 'ÔNIBUS' },
    { prefixo: '102302', cliente: 'MERCADO LIVRE', tipo: 'ÔNIBUS' },
    { prefixo: '121604', cliente: 'MERCADO LIVRE', tipo: 'ÔNIBUS' },
    { prefixo: '122502', cliente: 'MERCADO LIVRE', tipo: 'ÔNIBUS' },
    { prefixo: '122504', cliente: 'MERCADO LIVRE', tipo: 'ÔNIBUS' },
    // TECON
    { prefixo: '2004', cliente: 'TECON', tipo: 'ÔNIBUS' },
    { prefixo: '2008', cliente: 'TECON', tipo: 'ÔNIBUS' },
    { prefixo: '102520', cliente: 'TECON', tipo: 'ÔNIBUS' },
    { prefixo: '122420', cliente: 'TECON', tipo: 'ÔNIBUS' },
    { prefixo: '122422', cliente: 'TECON', tipo: 'ÔNIBUS' },
    // MARELLI
    { prefixo: '2028', cliente: 'MARELLI', tipo: 'MICRO' },
    { prefixo: '2030', cliente: 'MARELLI', tipo: 'MICRO' },
    { prefixo: '2034', cliente: 'MARELLI', tipo: 'MICRO' },
    { prefixo: '2038', cliente: 'MARELLI', tipo: 'MICRO' },
    // ACHÉ
    { prefixo: '2202', cliente: 'ACHÉ', tipo: 'MICRO' },
    { prefixo: '2204', cliente: 'ACHÉ', tipo: 'MICRO' },
    { prefixo: '2206', cliente: 'ACHÉ', tipo: 'MICRO' },
    { prefixo: '102502', cliente: 'ACHÉ', tipo: 'ÔNIBUS' },
    { prefixo: '102510', cliente: 'ACHÉ', tipo: 'ÔNIBUS' },
    // MASTERFOODS
    { prefixo: '522', cliente: 'MASTERFOODS', tipo: 'VAN' },
    { prefixo: '524', cliente: 'MASTERFOODS', tipo: 'VAN' },
    { prefixo: '528', cliente: 'MASTERFOODS', tipo: 'VAN' },
    // CAMPARI
    { prefixo: '2032', cliente: 'CAMPARI', tipo: 'MICRO' },
    { prefixo: '2210', cliente: 'CAMPARI', tipo: 'MICRO' },
    { prefixo: '2212', cliente: 'CAMPARI', tipo: 'MICRO' },
    { prefixo: '2220', cliente: 'CAMPARI', tipo: 'MICRO' },
    // AMANCO
    { prefixo: '2104', cliente: 'AMANCO', tipo: 'MICRO' },
    { prefixo: '2216', cliente: 'AMANCO', tipo: 'MICRO' },
    { prefixo: '2218', cliente: 'AMANCO', tipo: 'MICRO' },
    // AMCOR
    { prefixo: '102514', cliente: 'AMCOR', tipo: 'ÔNIBUS' },
    { prefixo: '102516', cliente: 'AMCOR', tipo: 'ÔNIBUS' },
    { prefixo: '102518', cliente: 'AMCOR', tipo: 'ÔNIBUS' },
    // MONTE RODOVIAS
    { prefixo: '304', cliente: 'MONTE RODOVIAS', tipo: 'VAN' },
    { prefixo: '306', cliente: 'MONTE RODOVIAS', tipo: 'VAN' },
    { prefixo: '308', cliente: 'MONTE RODOVIAS', tipo: 'VAN' },
    // CIMENTO FORTE
    { prefixo: '530', cliente: 'CIMENTO FORTE', tipo: 'VAN' },
    { prefixo: '2546', cliente: 'CIMENTO FORTE', tipo: 'MICRO' },
    // ECO RESORT
    { prefixo: '426', cliente: 'ECO RESORT', tipo: 'VAN' },
    { prefixo: '102204', cliente: 'ECO RESORT', tipo: 'ÔNIBUS' },
    // JCPM
    { prefixo: '1359', cliente: 'JCPM', tipo: 'ÔNIBUS' },
    { prefixo: '2018', cliente: 'JCPM', tipo: 'VAN' },
    { prefixo: '131002', cliente: 'JCPM', tipo: 'ÔNIBUS' },
    // HDH
    { prefixo: '1373', cliente: 'HDH', tipo: 'ÔNIBUS' },
    { prefixo: '1375', cliente: 'HDH', tipo: 'ÔNIBUS' },
    { prefixo: '1379', cliente: 'HDH', tipo: 'ÔNIBUS' },
    { prefixo: '121019', cliente: 'HDH', tipo: 'ÔNIBUS' },
    // ImBETTA
    { prefixo: '1502', cliente: 'ImBETTA', tipo: 'ÔNIBUS' },
    // CRISTAL PET
    { prefixo: '1948', cliente: 'CRISTAL PET', tipo: 'MICRO' },
    { prefixo: '2026', cliente: 'CRISTAL PET', tipo: 'MICRO' },
    // 51 MULLER
    { prefixo: '1322', cliente: '51 MULLER', tipo: 'MICRO' },
    { prefixo: '2102', cliente: '51 MULLER', tipo: 'MICRO' },
    { prefixo: '102508', cliente: '51 MULLER', tipo: 'ÔNIBUS' },
    // TURISMO
    { prefixo: '1712', cliente: 'TURISMO', tipo: 'ÔNIBUS' },
    { prefixo: '2302', cliente: 'TURISMO', tipo: 'ÔNIBUS' },
    // MOURA
    { prefixo: '2036', cliente: 'MOURA', tipo: 'MICRO' },
    { prefixo: '2404', cliente: 'MOURA', tipo: 'MICRO' },
    // DECAL
    { prefixo: '2408', cliente: 'DECAL', tipo: 'MICRO' },
    { prefixo: '2410', cliente: 'DECAL', tipo: 'MICRO' },
    // OMIRP
    { prefixo: '101248', cliente: 'OMIRP', tipo: 'ÔNIBUS' },
    // VILA GALÉ
    { prefixo: '121302', cliente: 'VILA GALÉ', tipo: 'ÔNIBUS' },
    // PREFEITURA IPO
    { prefixo: '1204', cliente: 'PREFEITURA IPO', tipo: 'MICRO' },
    // RETIDO
    { prefixo: '1517', cliente: 'RETIDO', tipo: 'ÔNIBUS' },
    { prefixo: '121014', cliente: 'RETIDO', tipo: 'ÔNIBUS' },
  ].sort((a, b) => a.cliente.localeCompare(b.cliente) || a.prefixo.localeCompare(b.prefixo));

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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Numeração do Veículo Substituto *</label>
                <select 
                  name="veiculo_substituto_placa" 
                  value={formData.veiculo_substituto_placa} 
                  onChange={handleChange} 
                  required={formData.houve_troca_veiculo === 'sim'} 
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Selecione o veículo substituto</option>
                  {todosVeiculos.map((veiculo, index) => (
                    <option key={index} value={veiculo.prefixo}>
                      {veiculo.prefixo} - {veiculo.tipo} ({veiculo.cliente})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Selecione o veículo que substituiu o original</p>
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
