import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Phone, Mail, MapPin, Calendar, Clock, 
  TrendingUp, AlertCircle, CheckCircle2, Edit, Trash2,
  Car, FileText, User, Menu, Building
} from 'lucide-react';
import { toast } from 'sonner';
import api from '../../services/api';

const DetalhesCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [veiculos, setVeiculos] = useState([]);
  const [ocorrencias, setOcorrencias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDadosCliente();
  }, [id]);

  const carregarDadosCliente = async () => {
    try {
      setLoading(true);
      
      console.log('🔍 Carregando cliente ID:', id);
      
      // Dados completos de veículos por cliente com base na planilha
      const veiculosPorCliente = {
        "MONTE RODOVIAS": [
          { prefixo: "186", tipo: "VAN", ano_fabricacao: 2003, ano_modelo: 1995, marca: null, wc: false, ar_condicionado: true, assentos: 18, local_saida: "CABO TURNO 1.0", motorista: "CAMPANELLA", rota: "JEAN YEN", casa_motorista: "CASA MOTORISTA" },
          { prefixo: "180", tipo: "VAN", ano_fabricacao: 2003, ano_modelo: 1992, marca: null, wc: false, ar_condicionado: true, assentos: 19, local_saida: null, motorista: "ELAYNE VILMA PART TIME", rota: "GASTON LINE", casa_motorista: null },
          { prefixo: "182", tipo: "VAN", ano_fabricacao: 2002, ano_modelo: 2002, marca: null, wc: false, ar_condicionado: true, assentos: 19, local_saida: "AZUP ENTRADA PART TIME", motorista: "DONRY", rota: "CARLOS ALBERTO WLIMA", casa_motorista: "01 DE CAB" },
          { prefixo: "180", tipo: "VAN", ano_fabricacao: 2003, ano_modelo: 1994, marca: null, wc: false, ar_condicionado: true, assentos: 19, local_saida: null, motorista: "OCHBY", rota: "OCECHEM", casa_motorista: null },
          { prefixo: "186", tipo: "VAN", ano_fabricacao: 2003, ano_modelo: 1995, marca: null, wc: false, ar_condicionado: true, assentos: 19, local_saida: null, motorista: "OCHBY", rota: "TOWING MONICA", casa_motorista: "ACUM JOSE" },
          { prefixo: "424", tipo: "VAN", ano_fabricacao: 2022, ano_modelo: 2023, marca: null, wc: false, ar_condicionado: true, assentos: 15, local_saida: null, motorista: "OCHBY", rota: "OCHBY", casa_motorista: "01 DE" },
          { prefixo: "402", tipo: "VAN", ano_fabricacao: 2020, ano_modelo: 2021, marca: null, wc: false, ar_condicionado: true, assentos: 15, local_saida: null, motorista: "ALEXANDRE CAMELO", rota: "AMOSTIO", casa_motorista: "GAIBU" },
          { prefixo: "186", tipo: "VAN", ano_fabricacao: 2004, ano_modelo: 2004, marca: null, wc: false, ar_condicionado: true, assentos: 19, local_saida: null, motorista: "CHIARELLA", rota: "AUDI RECIFE", casa_motorista: "TIJUABA" },
          { prefixo: "184", tipo: "VAN", ano_fabricacao: 2004, ano_modelo: 2004, marca: null, wc: false, ar_condicionado: true, assentos: 19, local_saida: null, motorista: "MARIDO RILAIDES", rota: null, casa_motorista: "MARIDO X ILMIDES" },
          { prefixo: "184", tipo: "VAN", ano_fabricacao: 2004, ano_modelo: 2004, marca: null, wc: false, ar_condicionado: true, assentos: 19, local_saida: null, motorista: "WECIPE", rota: "CLEVELEE, JOEL, LARA, MILLAS BELIS", casa_motorista: "WECIPE" },
          { prefixo: "192", tipo: "VAN", ano_fabricacao: 2001, ano_modelo: 1992, marca: null, wc: false, ar_condicionado: true, assentos: 17, local_saida: null, motorista: null, rota: "I PAOLA IMPALISES", casa_motorista: "CASA MOTORISTA" }
        ],
        "JEEP": [
          { prefixo: "1308", tipo: "MICRO", ano_fabricacao: 2011, ano_modelo: 2012, marca: null, wc: false, ar_condicionado: true, assentos: 27, local_saida: null, motorista: "WISNIELAN", rota: "LUXEMBURGO", casa_motorista: "30 10 PRINCÍ" },
          { prefixo: "1308", tipo: "MICRO", ano_fabricacao: 2011, ano_modelo: 2012, marca: null, wc: false, ar_condicionado: true, assentos: 27, local_saida: null, motorista: null, rota: "OSLO NORTE", casa_motorista: "CABO SAN" },
          { prefixo: "1308", tipo: "MICRO", ano_fabricacao: 2011, ano_modelo: 2012, marca: null, wc: false, ar_condicionado: true, assentos: 27, local_saida: null, motorista: "JOSÉ ALECIO", rota: "TURBO JARÃO MATS", casa_motorista: "CASA MOTORISTA" },
          { prefixo: "1373", tipo: "ÔNIBUS", ano_fabricacao: 2009, ano_modelo: 2010, marca: null, wc: true, ar_condicionado: true, assentos: 42, local_saida: null, motorista: "MÉTODO AMADO NÃO DISTRITO", rota: "MANUAL ARAUJO (VILELA E BÊBA PRAIAS)", casa_motorista: "CASA MOT" },
          { prefixo: "1712", tipo: "ÔNIBUS", ano_fabricacao: 2009, ano_modelo: 2010, marca: null, wc: true, ar_condicionado: true, assentos: 42, local_saida: null, motorista: null, rota: null, casa_motorista: null }
        ]
      };

      // Tentar buscar cliente do backend
      let clienteEncontrado = null;
      
      try {
        const response = await api.get(`/clientes/${id}`);
        console.log('✅ Cliente carregado do backend:', response.data);
        clienteEncontrado = response.data;
      } catch (error) {
        console.log('⚠️ Erro ao buscar do backend, buscando todos os clientes');
        
        // Se falhar, buscar todos e filtrar pelo ID
        try {
          const responseAll = await api.get('/clientes');
          console.log('📋 Total de clientes retornados:', responseAll.data.length);
          clienteEncontrado = responseAll.data.find(c => String(c.id) === String(id));
          
          if (clienteEncontrado) {
            console.log('✅ Cliente encontrado na lista completa:', clienteEncontrado);
          }
        } catch (errorAll) {
          console.error('❌ Erro ao buscar todos os clientes:', errorAll);
        }
      }
      
      if (!clienteEncontrado) {
        console.error('❌ Cliente não encontrado com ID:', id);
        setCliente(null);
        setLoading(false);
        return;
      }

      setCliente(clienteEncontrado);

      // Carregar veículos do cliente
      const veiculosCliente = veiculosPorCliente[clienteEncontrado.nome] || [];
      setVeiculos(veiculosCliente);

      // Carregar ocorrências do cliente
      try {
        const responseOcorrencias = await api.get('/ocorrencias');
        const ocorrenciasCliente = responseOcorrencias.data
          .filter(o => o.cliente_nome === clienteEncontrado.nome)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 10);
        setOcorrencias(ocorrenciasCliente || []);
      } catch (error) {
        console.log('Não foi possível carregar ocorrências:', error);
        setOcorrencias([]);
      }

    } catch (error) {
      console.error('Erro ao carregar dados do cliente:', error);
      toast.error('Erro ao carregar informações do cliente');
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (dataString) => {
    if (!dataString) return 'N/A';
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  const formatarDataHora = (dataString) => {
    if (!dataString) return 'N/A';
    return new Date(dataString).toLocaleString('pt-BR');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'concluido': return 'bg-green-100 text-green-700';
      case 'em_andamento': return 'bg-blue-100 text-blue-700';
      case 'pendente': return 'bg-yellow-100 text-yellow-700';
      case 'cancelado': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusTexto = (status) => {
    switch(status) {
      case 'concluido': return 'Concluído';
      case 'em_andamento': return 'Em Andamento';
      case 'pendente': return 'Pendente';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  };

  const calcularEstatisticas = () => {
    const total = ocorrencias.length;
    const concluidas = ocorrencias.filter(o => o.status === 'concluido').length;
    const emAndamento = ocorrencias.filter(o => o.status === 'em_andamento').length;
    const comAtraso = ocorrencias.filter(o => o.houve_atraso === 'sim').length;
    
    return { total, concluidas, emAndamento, comAtraso };
  };

  const stats = cliente ? calcularEstatisticas() : { total: 0, concluidas: 0, emAndamento: 0, comAtraso: 0 };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando informações...</p>
        </div>
      </div>
    );
  }

  if (!cliente) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Cliente não encontrado</h2>
          <button 
            onClick={() => navigate('/clientes')}
            className="mt-4 text-red-600 hover:underline"
          >
            Voltar para Gestão de Clientes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <main className="p-6 max-w-7xl mx-auto">
        {/* Botão Voltar */}
        <button 
          onClick={() => navigate('/clientes')}
          className="mb-4 text-gray-700 hover:text-black transition flex items-center gap-2"
        >
          <ArrowLeft size={24} />
          <span className="font-semibold">Voltar</span>
        </button>

        {/* Cabeçalho com Ações */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{cliente.nome}</h1>
            <p className="text-gray-500 text-sm mt-1">ID: {cliente.id} • Cadastrado em {formatarData(cliente.created_at)}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => navigate(`/clientes/editar/${id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-sm"
            >
              <Edit size={18} />
              Editar
            </button>
            <button 
              className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition shadow-sm"
            >
              <Trash2 size={18} />
              Excluir
            </button>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <FileText className="text-gray-500" size={24} />
              <span className="text-xs font-semibold text-gray-500 uppercase">Total</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            <p className="text-xs text-gray-500 mt-1">Ocorrências</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="text-green-500" size={24} />
              <span className="text-xs font-semibold text-gray-500 uppercase">Concluídas</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.concluidas}</p>
            <p className="text-xs text-gray-500 mt-1">Finalizadas</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-blue-500" size={24} />
              <span className="text-xs font-semibold text-gray-500 uppercase">Andamento</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.emAndamento}</p>
            <p className="text-xs text-gray-500 mt-1">Em progresso</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="text-red-500" size={24} />
              <span className="text-xs font-semibold text-gray-500 uppercase">Atrasos</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.comAtraso}</p>
            <p className="text-xs text-gray-500 mt-1">Com atraso</p>
          </div>
        </div>

        {/* Grid de Informações */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Informações Básicas */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Building size={20} />
              Informações do Cliente
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Razão Social</label>
                <p className="text-sm text-gray-800 font-medium">{cliente.nome}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">CNPJ</label>
                <p className="text-sm text-gray-800 font-medium">{cliente.cnpj}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Contato Principal</label>
                <p className="text-sm text-gray-800 font-medium">{cliente.contato}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Email</label>
                <p className="text-sm text-gray-800 font-medium flex items-center gap-2">
                  <Mail size={14} className="text-gray-500" />
                  {cliente.email}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Telefone</label>
                <p className="text-sm text-gray-800 font-medium flex items-center gap-2">
                  <Phone size={14} className="text-gray-500" />
                  {cliente.telefone}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">WhatsApp</label>
                <p className="text-sm text-gray-800 font-medium flex items-center gap-2">
                  <Phone size={14} className="text-gray-500" />
                  {cliente.whatsapp}
                </p>
              </div>
              <div className="col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Endereço</label>
                <p className="text-sm text-gray-800 font-medium flex items-center gap-2">
                  <MapPin size={14} className="text-gray-500" />
                  {cliente.endereco}, {cliente.bairro} - {cliente.cidade}/{cliente.estado} - CEP: {cliente.cep}
                </p>
              </div>
            </div>
          </div>

          {/* Informações de SLA */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock size={20} />
              Informações de Atendimento
            </h2>
            <div className="space-y-4">
              {/* Nível de SLA */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-2">Nível de SLA</label>
                <span className={`px-4 py-2 rounded-lg text-sm font-bold inline-block ${
                  cliente.sla_nivel === 'ALTO' ? 'bg-red-100 text-red-700' :
                  cliente.sla_nivel === 'MÉDIO' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {cliente.sla_nivel || 'ALTO'}
                </span>
              </div>

              {/* Ano da Frota */}
              {cliente.ano_frota && (
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Ano da Frota</label>
                  <p className="text-sm text-gray-800 font-medium">{cliente.ano_frota}</p>
                </div>
              )}

              {/* Prioridades de Comunicação */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-2">Prioridades na Comunicação</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 w-16">1ª OPÇÃO</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                      {cliente.prioridade_1 || 'WHATSAPP'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 w-16">2ª OPÇÃO</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
                      {cliente.prioridade_2 || 'LIGAÇÃO'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 w-16">3ª OPÇÃO</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
                      {cliente.prioridade_3 || 'E-MAIL'}
                    </span>
                  </div>
                </div>
              </div>

              {cliente.possui_sla && cliente.tempo_sla_minutos && (
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Tempo SLA</label>
                  <p className="text-sm text-gray-800 font-medium">{cliente.tempo_sla_minutos} minutos</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Observações */}
        {cliente.observacoes && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Observações</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{cliente.observacoes}</p>
          </div>
        )}

        {/* Grid para Veículos e Rotas */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Veículos do Cliente */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Car size={20} />
              Veículos Cadastrados ({veiculos.length})
            </h2>
            {veiculos.length > 0 ? (
              <div className="space-y-3">
                {veiculos.map((veiculo, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Car size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-lg">Prefixo: {veiculo.prefixo}</p>
                          <p className="text-sm text-gray-600">{veiculo.tipo}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {veiculo.ano_modelo}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                      <div>
                        <span className="text-gray-500 font-semibold">Ano Fab:</span>
                        <span className="ml-2 text-gray-800">{veiculo.ano_fabricacao || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 font-semibold">Modelo:</span>
                        <span className="ml-2 text-gray-800">{veiculo.ano_modelo || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 font-semibold">Assentos:</span>
                        <span className="ml-2 text-gray-800">{veiculo.assentos || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 font-semibold">Ar Cond:</span>
                        <span className="ml-2 text-gray-800">{veiculo.ar_condicionado ? 'Sim' : 'Não'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 font-semibold">WC:</span>
                        <span className="ml-2 text-gray-800">{veiculo.wc ? 'Sim' : 'Não'}</span>
                      </div>
                    </div>
                    
                    {veiculo.local_saida && (
                      <div className="mt-3 pt-2 border-t">
                        <span className="text-gray-500 font-semibold text-xs block mb-1">Local de Saída:</span>
                        <span className="text-gray-800 text-xs">{veiculo.local_saida}</span>
                      </div>
                    )}
                    
                    {veiculo.rota && (
                      <div className="mt-2">
                        <span className="text-gray-500 font-semibold text-xs block mb-1">Rota:</span>
                        <span className="text-gray-800 text-xs">{veiculo.rota}</span>
                      </div>
                    )}
                    
                    {veiculo.motorista && (
                      <div className="mt-2 pt-2 border-t">
                        <span className="text-gray-500 font-semibold text-xs block mb-1">Motorista:</span>
                        <span className="text-gray-800 text-xs">{veiculo.motorista}</span>
                      </div>
                    )}
                    
                    {veiculo.casa_motorista && (
                      <div className="mt-2">
                        <span className="text-gray-500 font-semibold text-xs block mb-1">Casa Motorista:</span>
                        <span className="text-gray-800 text-xs">{veiculo.casa_motorista}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Nenhum veículo cadastrado para este cliente.</p>
            )}
          </div>

          {/* Rotas Cadastradas */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin size={20} />
              Rotas Cadastradas (0)
            </h2>
            <p className="text-sm text-gray-500">Nenhuma rota cadastrada para este cliente.</p>
          </div>
        </div>

        {/* Ocorrências Recentes */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FileText size={20} />
              Ocorrências Recentes (últimas 10)
            </h2>
          </div>
          {ocorrencias.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50">
                  <tr className="text-gray-600 text-xs font-bold uppercase tracking-wider">
                    <th className="p-4">ID</th>
                    <th className="p-4">Veículo</th>
                    <th className="p-4">Tipo</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Data</th>
                    <th className="p-4">Atraso</th>
                    <th className="p-4 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ocorrencias.map((ocorrencia, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="p-4">
                        <span className="font-mono text-sm font-semibold text-gray-800">
                          {ocorrencia.numero_ocorrencia}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-700">{ocorrencia.veiculo_placa}</td>
                      <td className="p-4 text-sm text-gray-700">{ocorrencia.tipo_ocorrencia}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ocorrencia.status)}`}>
                          {getStatusTexto(ocorrencia.status)}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-700">{formatarData(ocorrencia.created_at)}</td>
                      <td className="p-4">
                        {ocorrencia.houve_atraso === 'sim' ? (
                          <span className="text-red-600 text-xs font-semibold">Sim</span>
                        ) : (
                          <span className="text-green-600 text-xs font-semibold">Não</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <button
                            onClick={() => navigate(`/ocorrencias/${ocorrencia.id}`)}
                            className="text-blue-600 hover:text-blue-800 transition"
                          >
                            <FileText size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-500">Nenhuma ocorrência registrada para este cliente.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DetalhesCliente;
