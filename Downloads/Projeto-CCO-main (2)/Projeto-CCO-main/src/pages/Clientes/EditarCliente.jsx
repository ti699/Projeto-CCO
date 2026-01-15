import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Menu } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../services/api';

const EditarCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    contato: '',
    telefone: '',
    whatsapp: '',
    email: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: 'PE',
    cep: '',
    possui_sla: false,
    tipo_sla: 'Contrato',
    tempo_sla_minutos: 60,
    observacoes: '',
    sla_nivel: '',
    prioridade_1: '',
    prioridade_2: '',
    prioridade_3: '',
    ano_frota: ''
  });

  // Lista de clientes (mesma da GestaoClientes)
  const clientesMock = [
    { id: 'C1', nome: '51 MULLER', contato: 'João Silva', telefone: '(81) 3333-1111', email: 'contato@51muller.com', endereco: 'Av. Industrial, 1234', bairro: 'Distrito Industrial', cidade: 'Recife', estado: 'PE', cep: '50000-000', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60 },
    { id: 'C2', nome: 'ACHÊ', contato: 'Maria Santos', telefone: '(81) 3333-2222', email: 'contato@ache.com', endereco: 'Rua Farmacêutica, 567', bairro: 'Boa Viagem', cidade: 'Recife', estado: 'PE', cep: '51020-000', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60 },
    { id: 'C3', nome: 'AMANCO', contato: 'Pedro Costa', telefone: '(81) 3333-3333', email: 'contato@amanco.com', endereco: 'Av. Principal, 890', bairro: 'Centro', cidade: 'Jaboatão', estado: 'PE', cep: '54400-000', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60 },
    { id: 'C6', nome: 'CBA', contato: 'Fernanda Lima', telefone: '(81) 3333-6666', email: 'contato@cba.com', endereco: 'Rua Comercial, 789', bairro: 'Centro', cidade: 'Recife', estado: 'PE', cep: '50010-000', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60 },
    { id: 'C14', nome: 'JEEP', contato: 'Alessandra Barbosa', telefone: '(81) 3334-5555', email: 'contato@jeep.com', endereco: 'Av. Automóveis, 852', bairro: 'Industrial', cidade: 'Jaboatão', estado: 'PE', cep: '54420-000', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60 },
    { id: 'C17', nome: 'MERCADO LIVRE', contato: 'Ana Sofia', telefone: '(81) 40028922', email: 'contato@mercadolivre.com', endereco: 'Rua São José do Egito, 616', bairro: 'Pau Amarelo', cidade: 'Paulista', estado: 'PE', cep: '53433-000', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60 },
  ];

  useEffect(() => {
    carregarCliente();
  }, [id]);

  const carregarCliente = async () => {
    try {
      setLoading(true);
      
      console.log('🔍 Carregando cliente ID:', id);
      
      // Tentar buscar do backend
      try {
        const response = await api.get(`/clientes/${id}`);
        console.log('✅ Cliente carregado do backend:', response.data);
        setFormData({
          ...response.data,
          sla_nivel: response.data.sla_nivel || '',
          prioridade_1: response.data.prioridade_1 || '',
          prioridade_2: response.data.prioridade_2 || '',
          prioridade_3: response.data.prioridade_3 || '',
          ano_frota: response.data.ano_frota || ''
        });
      } catch (error) {
        console.log('⚠️ Erro ao buscar do backend, usando dados mock');
        // Usar dados mock
        const clienteMock = clientesMock.find(c => c.id === id || c.id == id);
        if (clienteMock) {
          console.log('✅ Cliente encontrado nos dados mock:', clienteMock);
          setFormData({
            ...clienteMock,
            sla_nivel: clienteMock.sla_nivel || '',
            prioridade_1: clienteMock.prioridade_1 || '',
            prioridade_2: clienteMock.prioridade_2 || '',
            prioridade_3: clienteMock.prioridade_3 || '',
            ano_frota: clienteMock.ano_frota || ''
          });
        } else {
          console.error('❌ Cliente não encontrado nem no backend nem no mock');
          toast.error('Cliente não encontrado');
          navigate('/clientes');
        }
      }
    } catch (error) {
      console.error('❌ Erro ao carregar cliente:', error);
      toast.error('Erro ao carregar dados do cliente');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('📝 Tentando atualizar cliente:', id);
    console.log('📝 Dados do formulário:', formData);
    
    try {
      const response = await api.put(`/clientes/${id}`, formData);
      console.log('✅ Resposta da API:', response.data);
      toast.success('Cliente atualizado com sucesso!');
      navigate(`/clientes/${id}`);
    } catch (error) {
      console.error('❌ Erro ao atualizar cliente:', error);
      console.error('❌ Detalhes do erro:', error.response?.data);
      
      if (error.response?.status === 404) {
        toast.error('Cliente não encontrado');
      } else if (error.response?.status === 500) {
        toast.error('Erro no servidor ao atualizar cliente');
      } else {
        toast.error('Erro ao atualizar cliente');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <main className="p-6 max-w-4xl mx-auto">
        {/* Botão Voltar */}
        <button 
          onClick={() => navigate(`/clientes/${id}`)}
          className="mb-4 text-gray-700 hover:text-black transition flex items-center gap-2"
        >
          <ArrowLeft size={24} />
          <span className="font-semibold">Voltar</span>
        </button>

        {/* Título da Página */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Editar Cliente</h1>
          <p className="text-gray-500 text-sm mt-1">{formData.nome}</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações do Cliente</h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Razão Social */}
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Razão Social *
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            {/* CNPJ */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CNPJ
              </label>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            {/* Contato Principal */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contato Principal
              </label>
              <input
                type="text"
                name="contato"
                value={formData.contato}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Telefone
              </label>
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                WhatsApp
              </label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp || formData.telefone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            {/* Email */}
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            {/* Endereço */}
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Endereço
              </label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            {/* Bairro */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bairro
              </label>
              <input
                type="text"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            {/* Cidade */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cidade
              </label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Estado
              </label>
              <input
                type="text"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                maxLength={2}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            {/* CEP */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CEP
              </label>
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>

          {/* SLA */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Configurações de SLA</h3>
            
            <div className="space-y-4">
              {/* Possui SLA */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="possui_sla"
                  checked={formData.possui_sla}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <label className="text-sm font-semibold text-gray-700">
                  Cliente possui SLA
                </label>
              </div>

              {formData.possui_sla && (
                <div className="grid grid-cols-2 gap-4 pl-8">
                  {/* Tipo de SLA */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo de SLA
                    </label>
                    <select
                      name="tipo_sla"
                      value={formData.tipo_sla}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    >
                      <option value="Contrato">Contrato</option>
                      <option value="Atraso">Atraso</option>
                    </select>
                  </div>

                  {/* Tempo SLA */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tempo SLA (minutos)
                    </label>
                    <input
                      type="number"
                      name="tempo_sla_minutos"
                      value={formData.tempo_sla_minutos}
                      onChange={handleChange}
                      min="0"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>

                  {/* Nível SLA */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nível SLA
                    </label>
                    <select
                      name="sla_nivel"
                      value={formData.sla_nivel || ''}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    >
                      <option value="">Selecione</option>
                      <option value="ALTO">ALTO</option>
                      <option value="MÉDIO">MÉDIO</option>
                      <option value="BAIXO">BAIXO</option>
                    </select>
                  </div>

                  {/* Ano Frota */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ano Frota
                    </label>
                    <input
                      type="number"
                      name="ano_frota"
                      value={formData.ano_frota || ''}
                      onChange={handleChange}
                      min="1900"
                      max="2100"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      placeholder="Ex: 2018"
                    />
                  </div>

                  {/* Prioridade 1 */}
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prioridade 1 (1ª Opção de Comunicação)
                    </label>
                    <input
                      type="text"
                      name="prioridade_1"
                      value={formData.prioridade_1 || ''}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      placeholder="Ex: WhatsApp, Email, Telefone"
                    />
                  </div>

                  {/* Prioridade 2 */}
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prioridade 2 (2ª Opção de Comunicação)
                    </label>
                    <input
                      type="text"
                      name="prioridade_2"
                      value={formData.prioridade_2 || ''}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      placeholder="Ex: WhatsApp, Email, Telefone"
                    />
                  </div>

                  {/* Prioridade 3 */}
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prioridade 3 (3ª Opção de Comunicação)
                    </label>
                    <input
                      type="text"
                      name="prioridade_3"
                      value={formData.prioridade_3 || ''}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      placeholder="Ex: WhatsApp, Email, Telefone"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Observações */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Observações
            </label>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="Informações adicionais sobre o cliente..."
            ></textarea>
          </div>

          {/* Botões */}
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Salvar Alterações
            </button>
            <button
              type="button"
              onClick={() => navigate(`/clientes/${id}`)}
              className="px-6 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition font-semibold"
            >
              Cancelar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditarCliente;
