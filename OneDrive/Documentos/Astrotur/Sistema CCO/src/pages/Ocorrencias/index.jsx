import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../services/api';

const Ocorrencias = () => {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

  useEffect(() => {
    fetchOcorrencias();
  }, []);

  const fetchOcorrencias = async () => {
    try {
      const response = await api.get('/ocorrencias');
      setOcorrencias(response.data);
    } catch (error) {
      toast.error('Erro ao carregar ocorrências');
      // Mock data para demonstração
      setOcorrencias([
        {
          id: 1,
          numero: '005312',
          cliente: 'Hotel Mar Azul',
          tipo: 'Suspensão',
          data: '2025-12-24T12:12:00',
          status: 'Pendente',
          veiculo: 'ABC-1234'
        },
        {
          id: 2,
          numero: '005313',
          cliente: 'Pousada Sol Nascente',
          tipo: 'Motor',
          data: '2025-12-24T14:30:00',
          status: 'Em andamento',
          veiculo: 'DEF-5678'
        },
        {
          id: 3,
          numero: '005314',
          cliente: 'Resort Paradise',
          tipo: 'Elétrica',
          data: '2025-12-24T16:45:00',
          status: 'Concluído',
          veiculo: 'GHI-9012'
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const statusLower = (status || '').toLowerCase();
    if (statusLower === 'concluido' || statusLower === 'concluído') {
      return 'text-green-600 bg-green-50';
    }
    if (statusLower === 'em_andamento' || statusLower === 'em andamento') {
      return 'text-yellow-600 bg-yellow-50';
    }
    if (statusLower === 'pendente') {
      return 'text-red-600 bg-red-50';
    }
    return 'text-gray-600 bg-gray-50';
  };

  const filteredOcorrencias = ocorrencias.filter(occ => {
    const numero = occ.numero_ocorrencia || occ.numero || '';
    const cliente = occ.cliente_nome || occ.cliente || '';
    const tipo = occ.tipo_ocorrencia || occ.tipo || '';
    
    const matchesSearch = numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tipo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || occ.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Ocorrências</h1>
          <p className="text-gray-500">Gerenciamento de ocorrências operacionais</p>
        </div>
        <Link
          to="/ocorrencias/nova"
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-red-700 transition"
        >
          <Plus size={20} />
          Nova Ocorrência
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar por ID, cliente ou tipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="todos">Todos os status</option>
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluído">Concluído</option>
        </select>
        <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
          <Filter size={18} />
          Mais filtros
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Cliente</th>
              <th className="p-4 text-left">Veículo</th>
              <th className="p-4 text-left">Tipo</th>
              <th className="p-4 text-left">Data/Hora</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-700">
            {loading ? (
              <tr>
                <td colSpan="7" className="p-8 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                  </div>
                </td>
              </tr>
            ) : filteredOcorrencias.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">
                  Nenhuma ocorrência encontrada
                </td>
              </tr>
            ) : (
              filteredOcorrencias.map((occ) => (
                <tr key={occ.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-semibold">{occ.numero_ocorrencia || occ.numero}</td>
                  <td className="p-4">{occ.cliente_nome || occ.cliente}</td>
                  <td className="p-4">{occ.veiculo_placa || occ.veiculo}</td>
                  <td className="p-4">{occ.tipo_ocorrencia || occ.tipo}</td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(occ.data_ocorrencia || occ.created_at || occ.data).toLocaleString('pt-BR')}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(occ.status)}`}>
                      {occ.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/ocorrencias/${occ.id}`}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                        title="Ver detalhes"
                      >
                        <Eye size={18} className="text-blue-600" />
                      </Link>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                        title="Editar"
                      >
                        <Edit size={18} className="text-gray-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                        title="Excluir"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">
          Mostrando {filteredOcorrencias.length} de {ocorrencias.length} ocorrências
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition">
            Anterior
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg">1</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition">2</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition">
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ocorrencias;
