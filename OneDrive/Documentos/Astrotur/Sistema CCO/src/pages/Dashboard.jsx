import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import { Filter, FileText } from 'lucide-react';
import api from '../services/api';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalOcorrencias: 0,
    atrasos: 0,
    veiculosAtribuidos: 0,
    tempoMedioAtendimento: '0 horas e 0 min',
    ocorrenciasHoje: 0,
    comparacaoMesAnterior: 0,
    comparacaoAtrasos: 0
  });
  const [ocorrenciasPorDia, setOcorrenciasPorDia] = useState([]);
  const [topTipos, setTopTipos] = useState([]);
  const [ultimasOcorrencias, setUltimasOcorrencias] = useState([]);
  const [distribuicaoStatus, setDistribuicaoStatus] = useState([]);
  const [distribuicaoVeiculos, setDistribuicaoVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [finalizandoPlantao, setFinalizandoPlantao] = useState(false);
  const [modalPlantao, setModalPlantao] = useState(false);
  const [observacoesPlantao, setObservacoesPlantao] = useState('');

  const COLORS = {
    concluido: '#22c55e',
    em_andamento: '#f59e0b', 
    pendente: '#ef4444'
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      
      const [statsRes, porDiaRes, tiposRes, ultimasRes, statusRes, veiculosRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/dashboard/ocorrencias-por-dia'),
        api.get('/dashboard/top-tipos'),
        api.get('/dashboard/ultimas-ocorrencias?limit=7'),
        api.get('/dashboard/distribuicao-status'),
        api.get('/dashboard/distribuicao-veiculos')
      ]);

      setStats(statsRes.data);
      setOcorrenciasPorDia(porDiaRes.data);
      setTopTipos(tiposRes.data);
      setUltimasOcorrencias(ultimasRes.data);
      setDistribuicaoStatus(statusRes.data);
      setDistribuicaoVeiculos(veiculosRes.data);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
      toast.error('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatarStatus = (status) => {
    const statusMap = {
      'pendente': 'Pendente',
      'em_andamento': 'Em andamento',
      'concluido': 'Concluído',
      'cancelado': 'Cancelado'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'pendente': 'text-red-500',
      'em_andamento': 'text-yellow-500',
      'concluido': 'text-green-500',
      'cancelado': 'text-gray-500'
    };
    return colorMap[status] || 'text-gray-500';
  };

  const handleFinalizarPlantao = async () => {
    try {
      setFinalizandoPlantao(true);
      
      const user = JSON.parse(localStorage.getItem('user'));
      
      const response = await api.post('/ocorrencias/finalizar-plantao', {
        usuario_id: user.id,
        observacoes: observacoesPlantao
      });

      toast.success('Plantão finalizado com sucesso! Relatório gerado.');
      
      // Baixar relatório como JSON
      const blob = new Blob([JSON.stringify(response.data.relatorio, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      
      setModalPlantao(false);
      setObservacoesPlantao('');
      
    } catch (error) {
      console.error('Erro ao finalizar plantão:', error);
      toast.error('Erro ao finalizar plantão');
    } finally {
      setFinalizandoPlantao(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center h-64">
        <div className="text-gray-500">Carregando...</div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto">
        {/* Cabeçalho do Dashboard */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500">Visão geral das ocorrências e métricas</p>
          </div>
          <button 
            onClick={() => navigate('/ocorrencias/nova')}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-red-700 transition"
          >
            Registrar ocorrência
          </button>
        </div>

        {/* Barra de Filtros */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Filtrar por ocorrência, tipo de quebra ou status..." 
              className="w-full p-3 border rounded-lg shadow-sm"
            />
          </div>
          <button className="bg-white border px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-gray-600">
            <Filter size={20} /> Filtros
          </button>
        </div>

        {/* Cards de KPIs */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 font-semibold mb-1">Total ocorrências (30d):</p>
            <p className="text-xl font-bold text-gray-800">{stats.totalOcorrencias}</p>
            <p className="text-[10px] mt-1 font-bold text-green-600">
              ↑ {stats.comparacaoMesAnterior}% vs período anterior
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 font-semibold mb-1">Atrasos:</p>
            <p className="text-xl font-bold text-gray-800">{stats.atrasos}</p>
            <p className="text-[10px] mt-1 font-bold text-red-600">
              {stats.comparacaoAtrasos > 0 ? '↑' : '↓'} {Math.abs(stats.comparacaoAtrasos)}% vs período anterior
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 font-semibold mb-1">Veículos atribuídos:</p>
            <p className="text-xl font-bold text-gray-800">{stats.veiculosAtribuidos}</p>
            <p className="text-[10px] text-blue-600 text-right cursor-pointer" onClick={() => navigate('/cadastros/veiculos')}>
              Ver
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 font-semibold mb-1">Tempo médio atendimento</p>
            <p className="text-xl font-bold text-gray-800">{stats.tempoMedioAtendimento}</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 font-semibold mb-1">Ocorrências hoje</p>
            <p className="text-xl font-bold text-gray-800">{stats.ocorrenciasHoje}</p>
          </div>
        </div>

        {/* Seção de Gráficos - Linha 1 */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border h-80">
            <h3 className="font-bold text-gray-700 mb-4">Ocorrência por dia (últimos 7 dias)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ocorrenciasPorDia}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="data" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="quantidade" stroke="#0d9488" strokeWidth={2} dot={{ r: 4, fill: '#0d9488' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border h-80">
            <h3 className="font-bold text-gray-700 mb-4">Top 5 tipos de ocorrência</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topTipos}>
                <XAxis dataKey="tipo" fontSize={10} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Seção de Gráficos - Linha 2 */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border h-80">
            <h3 className="font-bold text-gray-700 mb-4">Distribuição por Status</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribuicaoStatus.map(item => ({
                    name: formatarStatus(item.status),
                    value: item.total,
                    status: item.status
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distribuicaoStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.status] || '#94a3b8'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border h-80">
            <h3 className="font-bold text-gray-700 mb-4">Ocorrências por Tipo de Veículo</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distribuicaoVeiculos}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="tipo" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="total" fill="#0d9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabela de Últimas Ocorrências */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-12">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-bold text-gray-700">Últimas ocorrências</h3>
            <span 
              className="text-blue-600 text-sm font-semibold cursor-pointer"
              onClick={() => navigate('/ocorrencias')}
            >
              Ver todas
            </span>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Tipo de ocorrência</th>
                <th className="p-4">Data</th>
                <th className="p-4">Status</th>
                <th className="p-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-700">
              {ultimasOcorrencias.length > 0 ? (
                ultimasOcorrencias.map((ocorrencia) => (
                  <tr key={ocorrencia.id} className="hover:bg-gray-50 transition">
                    <td className="p-4">{ocorrencia.numero_ocorrencia}</td>
                    <td className="p-4">{ocorrencia.cliente_nome || 'N/A'}</td>
                    <td className="p-4">{ocorrencia.tipo_quebra || 'N/A'}</td>
                    <td className="p-4 text-sm text-gray-500">{formatarData(ocorrencia.data_ocorrencia)}</td>
                    <td className={`p-4 font-bold ${getStatusColor(ocorrencia.status)}`}>
                      {formatarStatus(ocorrencia.status)}
                    </td>
                    <td className="p-4 text-blue-600 cursor-pointer text-sm font-semibold" onClick={() => navigate(`/ocorrencias/${ocorrencia.id}`)}>
                      Ver
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    Nenhuma ocorrência registrada ainda
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Botão de Finalizar Plantão */}
        <div className="flex justify-end">
          <button 
            className="bg-red-600 text-white px-12 py-4 rounded-lg font-bold text-xl uppercase shadow-lg hover:bg-red-700 transition"
            onClick={() => setModalPlantao(true)}
          >
            Finalizar Plantão
          </button>
        </div>
        
        {/* Modal de Finalizar Plantão */}
        {modalPlantao && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4">Finalizar Plantão</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  value={observacoesPlantao}
                  onChange={(e) => setObservacoesPlantao(e.target.value)}
                  placeholder="Digite observações sobre o plantão..."
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => {
                    setModalPlantao(false);
                    setObservacoesPlantao('');
                  }}
                  disabled={finalizandoPlantao}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                  onClick={handleFinalizarPlantao}
                  disabled={finalizandoPlantao}
                >
                  {finalizandoPlantao ? 'Gerando...' : 'Finalizar'}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Dashboard;
