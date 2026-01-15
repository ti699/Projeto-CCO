import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Phone, MessageCircle, Mail, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../services/api';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalDetalhes, setModalDetalhes] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [editingCliente, setEditingCliente] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    nome_contato: '',
    contato: '',
    email: '',
    endereco: '',
    sla: ''
  });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/clientes');
      console.log('✅ Clientes carregados do banco:', response.data.length);
      setClientes(response.data);
      localStorage.setItem('clientes_data', JSON.stringify(response.data));
    } catch (error) {
      console.error('❌ Erro ao carregar clientes:', error);
      toast.error('Erro ao carregar clientes do banco de dados');
      setClientes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🔄 Iniciando submit do formulário');
    console.log('📋 Dados do formulário:', formData);
    console.log('✏️ Modo edição?', !!editingCliente);
    
    try {
      if (editingCliente) {
        console.log('📤 Atualizando cliente:', editingCliente.id);
        await api.put(`/clientes/${editingCliente.id}`, formData);
        toast.success('Cliente atualizado com sucesso!');
      } else {
        console.log('📤 Criando novo cliente...');
        const response = await api.post('/clientes', formData);
        console.log('✅ Cliente criado:', response.data);
        toast.success('Cliente criado com sucesso!');
      }
      setShowModal(false);
      setFormData({ nome: '', cnpj: '', contato: '', email: '', endereco: '', sla: '' });
      setEditingCliente(null);
      fetchClientes();
    } catch (error) {
      console.error('❌ Erro ao salvar cliente:', error);
      console.error('Resposta do servidor:', error.response?.data);
      console.error('Status:', error.response?.status);
      toast.error(error.response?.data?.message || 'Erro ao salvar cliente');
    }
  };

  const handleEdit = (cliente) => {
    setEditingCliente(cliente);
    setFormData(cliente);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Deseja realmente excluir este cliente?')) {
      try {
        await api.delete(`/clientes/${id}`);
        toast.success('Cliente excluído com sucesso!');
        fetchClientes();
      } catch (error) {
        toast.error('Erro ao excluir cliente');
      }
    }
  };

  const filteredClientes = clientes.filter(c =>
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.cnpj.includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
          <p className="text-gray-500">Gerenciamento de clientes</p>
        </div>
        <button
          onClick={() => {
            setEditingCliente(null);
            setFormData({ nome: '', cnpj: '', contato: '', email: '', endereco: '', sla: '' });
            setShowModal(true);
          }}
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-red-700 transition"
        >
          <Plus size={20} />
          Novo Cliente
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar por nome ou CNPJ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4 text-left">Cliente</th>
              <th className="p-4 text-left">Nome do Contato</th>
              <th className="p-4 text-left">Telefone</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">SLA (horas)</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-700">
            {loading ? (
              <tr>
                <td colSpan="6" className="p-8 text-center">Carregando clientes...</td>
              </tr>
            ) : filteredClientes.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  {searchTerm ? 'Nenhum cliente encontrado com esse termo de busca' : 'Nenhum cliente cadastrado'}
                </td>
              </tr>
            ) : (
              filteredClientes.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="font-semibold text-gray-800">{cliente.nome}</div>
                    <div className="text-xs text-gray-500">{cliente.cnpj}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-700">{cliente.nome_contato || '-'}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-4 h-4 text-blue-600" />
                      {cliente.contato || '-'}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Mail className="w-4 h-4 text-purple-600" />
                      <span className="truncate max-w-xs" title={cliente.email}>{cliente.email || '-'}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {cliente.sla_horas || cliente.sla || 2}h
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => {
                          setClienteSelecionado(cliente);
                          setModalDetalhes(true);
                        }}
                        className="p-2 hover:bg-blue-100 rounded-lg transition"
                        title="Visualizar Detalhes"
                      >
                        <Eye size={18} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleEdit(cliente)}
                        className="p-2 hover:bg-green-100 rounded-lg transition"
                        title="Editar"
                      >
                        <Edit size={18} className="text-green-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(cliente.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition"
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingCliente ? 'Editar Cliente' : 'Novo Cliente'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nome *</label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CNPJ *</label>
                  <input
                    type="text"
                    required
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nome do Contato</label>
                  <input
                    type="text"
                    value={formData.nome_contato}
                    onChange={(e) => setFormData({ ...formData, nome_contato: e.target.value })}
                    placeholder="Ex: João Silva"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone *</label>
                  <input
                    type="text"
                    required
                    value={formData.contato}
                    onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">SLA</label>
                  <input
                    type="text"
                    value={formData.sla}
                    onChange={(e) => setFormData({ ...formData, sla: e.target.value })}
                    placeholder="Ex: 2 horas"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Endereço</label>
                  <input
                    type="text"
                    value={formData.endereco}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCliente(null);
                    setFormData({ nome: '', cnpj: '', nome_contato: '', contato: '', email: '', endereco: '', sla: '' });
                  }}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detalhes do Cliente */}
      {modalDetalhes && clienteSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">{clienteSelecionado.nome}</h2>
                <p className="text-blue-100 text-sm mt-1">Informações Completas de Comunicação</p>
              </div>
              <button
                onClick={() => {
                  setModalDetalhes(false);
                  setClienteSelecionado(null);
                }}
                className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-6">
              {/* Informações Básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <span className="text-sm font-medium">CNPJ</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{clienteSelecionado.cnpj}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Ano da Frota</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{clienteSelecionado.ano_frota}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">Pessoa de Contato</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{clienteSelecionado.contato_pessoa}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <span className="text-sm font-medium">Nível de Exigência (SLA)</span>
                  </div>
                  <span className={`inline-block px-4 py-2 rounded-full text-lg font-bold ${
                    clienteSelecionado.sla === 'ALTO' ? 'bg-red-100 text-red-700' :
                    clienteSelecionado.sla === 'MÉDIO' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {clienteSelecionado.sla}
                  </span>
                </div>
              </div>

              {/* Contato */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  Informações de Contato
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-800 mb-2">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm font-medium">Telefone</span>
                    </div>
                    <p className="text-gray-800 font-semibold">{clienteSelecionado.telefone}</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-purple-800 mb-2">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm font-medium">E-mail</span>
                    </div>
                    <p className="text-gray-800 text-sm break-words">{clienteSelecionado.email}</p>
                  </div>
                </div>
              </div>

              {/* Prioridades de Comunicação */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  Prioridades na Comunicação
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-2 border-green-300">
                    <div className="text-xs text-green-700 font-semibold mb-2">1ª OPÇÃO</div>
                    <div className="flex items-center gap-2">
                      {clienteSelecionado.comunicacao_1 === 'LIGAÇÃO' && <Phone className="w-5 h-5 text-green-600" />}
                      {clienteSelecionado.comunicacao_1 === 'WHATSAPP' && <MessageCircle className="w-5 h-5 text-green-600" />}
                      {clienteSelecionado.comunicacao_1 === 'E-MAIL' && <Mail className="w-5 h-5 text-green-600" />}
                      <span className="text-lg font-bold text-green-800">{clienteSelecionado.comunicacao_1}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border-2 border-yellow-300">
                    <div className="text-xs text-yellow-700 font-semibold mb-2">2ª OPÇÃO</div>
                    <div className="flex items-center gap-2">
                      {clienteSelecionado.comunicacao_2 === 'LIGAÇÃO' && <Phone className="w-5 h-5 text-yellow-600" />}
                      {clienteSelecionado.comunicacao_2 === 'WHATSAPP' && <MessageCircle className="w-5 h-5 text-yellow-600" />}
                      {clienteSelecionado.comunicacao_2 === 'E-MAIL' && <Mail className="w-5 h-5 text-yellow-600" />}
                      <span className="text-lg font-bold text-yellow-800">{clienteSelecionado.comunicacao_2}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border-2 border-orange-300">
                    <div className="text-xs text-orange-700 font-semibold mb-2">3ª OPÇÃO</div>
                    <div className="flex items-center gap-2">
                      {clienteSelecionado.comunicacao_3 === 'LIGAÇÃO' && <Phone className="w-5 h-5 text-orange-600" />}
                      {clienteSelecionado.comunicacao_3 === 'WHATSAPP' && <MessageCircle className="w-5 h-5 text-orange-600" />}
                      {clienteSelecionado.comunicacao_3 === 'E-MAIL' && <Mail className="w-5 h-5 text-orange-600" />}
                      <span className="text-lg font-bold text-orange-800">{clienteSelecionado.comunicacao_3}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estatísticas */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total de Veículos</p>
                    <p className="text-3xl font-bold text-blue-600">{clienteSelecionado.veiculos}</p>
                  </div>
                  <div className="p-4 bg-blue-600 rounded-full">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setModalDetalhes(false);
                  setClienteSelecionado(null);
                }}
                className="w-full mt-6 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
