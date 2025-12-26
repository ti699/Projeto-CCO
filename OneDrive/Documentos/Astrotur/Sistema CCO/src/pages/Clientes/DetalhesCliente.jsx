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
      
      // Lista de clientes (mesma do GestaoClientes)
      const clientesMock = [
        { id: 'C1', nome: '51 MULLER', contato: 'João Silva', telefone: '(81) 3333-1111', email: 'contato@51muller.com', endereco: 'Av. Industrial, 1234', bairro: 'Distrito Industrial', cidade: 'Recife', estado: 'PE', cep: '50000-000', cnpj: '12.345.678/0001-01', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-01-15T10:00:00', whatsapp: '(81) 99999-1111', observacoes: '' },
        { id: 'C2', nome: 'ACHÊ', contato: 'Maria Santos', telefone: '(81) 3333-2222', email: 'contato@ache.com', endereco: 'Rua Farmacêutica, 567', bairro: 'Boa Viagem', cidade: 'Recife', estado: 'PE', cep: '51000-000', cnpj: '23.456.789/0001-02', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-01-20T10:00:00', whatsapp: '(81) 99999-2222', observacoes: '' },
        { id: 'C3', nome: 'AMANCO', contato: 'Pedro Costa', telefone: '(81) 3333-3333', email: 'contato@amanco.com', endereco: 'Av. Principal, 890', bairro: 'Jaboatão', cidade: 'Jaboatão', estado: 'PE', cep: '54000-000', cnpj: '34.567.890/0001-03', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-02-01T10:00:00', whatsapp: '(81) 99999-3333', observacoes: '' },
        { id: 'C4', nome: 'AMCOR', contato: 'Ana Paula', telefone: '(81) 3333-4444', email: 'contato@amcor.com', endereco: 'Rua Embalagens, 234', bairro: 'Cabo', cidade: 'Cabo de Santo Agostinho', estado: 'PE', cep: '54500-000', cnpj: '45.678.901/0001-04', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-02-10T10:00:00', whatsapp: '(81) 99999-4444', observacoes: '' },
        { id: 'C5', nome: 'CAMPARI', contato: 'Carlos Oliveira', telefone: '(81) 3333-5555', email: 'contato@campari.com', endereco: 'Av. das Bebidas, 456', bairro: 'Suape', cidade: 'Ipojuca', estado: 'PE', cep: '55590-000', cnpj: '56.789.012/0001-05', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-03-01T10:00:00', whatsapp: '(81) 99999-5555', observacoes: '' },
        { id: 'C6', nome: 'CBA', contato: 'Fernanda Lima', telefone: '(81) 3333-6666', email: 'contato@cba.com', endereco: 'Rua Comercial, 789', bairro: 'Centro', cidade: 'Recife', estado: 'PE', cep: '50010-000', cnpj: '67.890.123/0001-06', possui_sla: true, tipo_sla: 'Atraso', tempo_sla_minutos: 90, created_at: '2024-03-15T10:00:00', whatsapp: '(81) 99999-6666', observacoes: '' },
        { id: 'C7', nome: 'CONSAG', contato: 'Roberto Alves', telefone: '(81) 3333-7777', email: 'contato@consag.com', endereco: 'Av. Agropecuária, 321', bairro: 'Vitória', cidade: 'Vitória de Santo Antão', estado: 'PE', cep: '55600-000', cnpj: '78.901.234/0001-07', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-04-01T10:00:00', whatsapp: '(81) 99999-7777', observacoes: '' },
        { id: 'C8', nome: 'CRISTALPET', contato: 'Julia Martins', telefone: '(81) 3333-8888', email: 'contato@cristalpet.com', endereco: 'Rua Plásticos, 654', bairro: 'Igarassu', cidade: 'Igarassu', estado: 'PE', cep: '53610-000', cnpj: '89.012.345/0001-08', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-04-15T10:00:00', whatsapp: '(81) 99999-8888', observacoes: '' },
        { id: 'C9', nome: 'DECAL', contato: 'Marcos Silva', telefone: '(81) 3333-9999', email: 'contato@decal.com', endereco: 'Av. Decorações, 987', bairro: 'Olinda', cidade: 'Olinda', estado: 'PE', cep: '53000-000', cnpj: '90.123.456/0001-09', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-05-01T10:00:00', whatsapp: '(81) 99999-9999', observacoes: '' },
        { id: 'C10', nome: 'HDH', contato: 'Beatriz Santos', telefone: '(81) 3334-1111', email: 'contato@hdh.com', endereco: 'Rua Hoteleira, 147', bairro: 'Boa Viagem', cidade: 'Recife', estado: 'PE', cep: '51020-000', cnpj: '01.234.567/0001-10', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-05-15T10:00:00', whatsapp: '(81) 99998-1111', observacoes: '' },
        { id: 'C11', nome: 'HOTEL VIVÁ', contato: 'Ricardo Costa', telefone: '(81) 3334-2222', email: 'contato@hotelviva.com', endereco: 'Av. Conselheiro Aguiar, 258', bairro: 'Boa Viagem', cidade: 'Recife', estado: 'PE', cep: '51021-000', cnpj: '12.345.678/0001-11', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-06-01T10:00:00', whatsapp: '(81) 99998-2222', observacoes: '' },
        { id: 'C12', nome: 'INBETTA', contato: 'Camila Rocha', telefone: '(81) 3334-3333', email: 'contato@inbetta.com', endereco: 'Rua Industrial, 369', bairro: 'Paulista', cidade: 'Paulista', estado: 'PE', cep: '53400-000', cnpj: '23.456.789/0001-12', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-06-15T10:00:00', whatsapp: '(81) 99998-3333', observacoes: '' },
        { id: 'C13', nome: 'JCPM', contato: 'Felipe Barros', telefone: '(81) 3334-4444', email: 'contato@jcpm.com', endereco: 'Av. Empresarial, 741', bairro: 'Recife', cidade: 'Recife', estado: 'PE', cep: '50030-000', cnpj: '34.567.890/0001-13', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-07-01T10:00:00', whatsapp: '(81) 99998-4444', observacoes: '' },
        { id: 'C14', nome: 'JEEP', contato: 'Alessandra Barbosa', telefone: '(81) 3334-5555', email: 'contato@jeep.com', endereco: 'Av. Automóveis, 852', bairro: 'Jaboatão', cidade: 'Jaboatão', estado: 'PE', cep: '54100-000', cnpj: '45.678.901/0001-14', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-07-15T10:00:00', whatsapp: '(81) 99998-5555', observacoes: '' },
        { id: 'C15', nome: 'MARELLI', contato: 'Bruno Fernandes', telefone: '(81) 3334-6666', email: 'contato@marelli.com', endereco: 'Rua Autopeças, 963', bairro: 'Cabo', cidade: 'Cabo de Santo Agostinho', estado: 'PE', cep: '54510-000', cnpj: '56.789.012/0001-15', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-08-01T10:00:00', whatsapp: '(81) 99998-6666', observacoes: '' },
        { id: 'C16', nome: 'MASTERFOOD', contato: 'Larissa Souza', telefone: '(81) 3334-7777', email: 'contato@masterfood.com', endereco: 'Av. Alimentos, 159', bairro: 'Recife', cidade: 'Recife', estado: 'PE', cep: '50040-000', cnpj: '67.890.123/0001-16', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-08-15T10:00:00', whatsapp: '(81) 99998-7777', observacoes: '' },
        { id: 'C17', nome: 'MERCADO LIVRE', contato: 'Ana Sofia', telefone: '(81) 40028922', email: 'contato@mercadolivre.com.br', endereco: 'Rua São José do Egito, 616', bairro: 'Pau Amarelo', cidade: 'Paulista', estado: 'PE', cep: '53433-000', cnpj: '78.901.234/0001-17', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-09-01T10:00:00', whatsapp: '(81) 98765-4321', observacoes: 'Cliente prioritário com contrato de nível platinum' },
        { id: 'C18', nome: 'MONTE RODOVIAS', contato: 'Thiago Oliveira', telefone: '(81) 3335-1111', email: 'contato@monterodovias.com', endereco: 'BR-101, Km 45', bairro: 'Igarassu', cidade: 'Igarassu', estado: 'PE', cep: '53620-000', cnpj: '89.012.345/0001-18', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-09-15T10:00:00', whatsapp: '(81) 99997-1111', observacoes: '' },
        { id: 'C19', nome: 'MOURA', contato: 'Vanessa Lima', telefone: '(81) 3335-2222', email: 'contato@moura.com', endereco: 'Av. Baterias, 357', bairro: 'Barro', cidade: 'Recife', estado: 'PE', cep: '50050-000', cnpj: '90.123.456/0001-19', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-10-01T10:00:00', whatsapp: '(81) 99997-2222', observacoes: '' },
        { id: 'C20', nome: 'OMIRP', contato: 'Gabriel Mendes', telefone: '(81) 3335-3333', email: 'contato@omirp.com', endereco: 'Rua Química, 468', bairro: 'Suape', cidade: 'Ipojuca', estado: 'PE', cep: '55591-000', cnpj: '01.234.567/0001-20', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-10-15T10:00:00', whatsapp: '(81) 99997-3333', observacoes: '' },
        { id: 'C21', nome: 'PIATEC', contato: 'Paula Rodrigues', telefone: '(81) 3335-4444', email: 'contato@piatec.com', endereco: 'Av. Tecnológica, 579', bairro: 'Recife', cidade: 'Recife', estado: 'PE', cep: '50060-000', cnpj: '12.345.678/0001-21', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-11-01T10:00:00', whatsapp: '(81) 99997-4444', observacoes: '' },
        { id: 'C22', nome: 'TECON', contato: 'Rafael Castro', telefone: '(81) 3335-5555', email: 'contato@tecon.com', endereco: 'Porto de Suape, s/n', bairro: 'Suape', cidade: 'Ipojuca', estado: 'PE', cep: '55592-000', cnpj: '23.456.789/0001-22', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-11-15T10:00:00', whatsapp: '(81) 99997-5555', observacoes: '' },
        { id: 'C23', nome: 'TURISMO', contato: 'Isabela Nunes', telefone: '(81) 3335-6666', email: 'contato@turismo.com', endereco: 'Av. Boa Viagem, 4821', bairro: 'Boa Viagem', cidade: 'Recife', estado: 'PE', cep: '51030-000', cnpj: '34.567.890/0001-23', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-12-01T10:00:00', whatsapp: '(81) 99997-6666', observacoes: '' },
        { id: 'C24', nome: 'VILA GALÉ', contato: 'Leonardo Dias', telefone: '(81) 3335-7777', email: 'contato@vilagale.com', endereco: 'Av. Atlântica, 123', bairro: 'Cabo', cidade: 'Cabo de Santo Agostinho', estado: 'PE', cep: '54520-000', cnpj: '45.678.901/0001-24', possui_sla: true, tipo_sla: 'Contrato', tempo_sla_minutos: 60, created_at: '2024-12-15T10:00:00', whatsapp: '(81) 99997-7777', observacoes: '' },
      ];

      // Buscar o cliente pelo ID
      const clienteEncontrado = clientesMock.find(c => c.id === id);
      
      if (!clienteEncontrado) {
        setCliente(null);
        setLoading(false);
        return;
      }

      setCliente(clienteEncontrado);

      // Carregar veículos do cliente
      try {
        const responseVeiculos = await api.get('/veiculos');
        const veiculosCliente = responseVeiculos.data.filter(v => v.cliente_nome === clienteEncontrado.nome);
        setVeiculos(veiculosCliente || []);
      } catch (error) {
        console.log('Não foi possível carregar veículos:', error);
        setVeiculos([]);
      }

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
              Acordo de Nível (SLA)
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-2">Status SLA</label>
                {cliente.possui_sla ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 size={20} />
                    <span className="font-semibold">Cliente possui SLA</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-400">
                    <AlertCircle size={20} />
                    <span className="font-semibold">Sem SLA cadastrado</span>
                  </div>
                )}
              </div>
              {cliente.possui_sla && (
                <>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Tipo de SLA</label>
                    <p className="text-sm text-gray-800 font-medium">{cliente.tipo_sla}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Tempo SLA</label>
                    <p className="text-sm text-gray-800 font-medium">{cliente.tempo_sla_minutos} minutos</p>
                  </div>
                </>
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
                {veiculos.slice(0, 5).map((veiculo, index) => (
                  <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 transition">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Car size={16} className="text-gray-500" />
                        <p className="font-bold text-gray-800">{veiculo.placa}</p>
                      </div>
                      <span className="text-xs font-semibold text-gray-500">ID: {veiculo.id}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 ml-6">{veiculo.modelo || 'Modelo não informado'}</p>
                  </div>
                ))}
                {veiculos.length > 5 && (
                  <p className="text-xs text-gray-500 text-center mt-2">+ {veiculos.length - 5} veículos</p>
                )}
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
