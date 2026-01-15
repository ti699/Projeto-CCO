import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, Filter, User, Users, MapPin, Clock, 
  Eye, Edit, Trash2, Menu 
} from 'lucide-react';

const GestaoClientes = () => {
  const navigate = useNavigate();
  
  // Lista de clientes do sistema
  const clientes = [
    { id: 'C1', nome: '51 MULLER', contato: 'Lima/Josiane', telefone: '0800472777 / 88120-3525', endereco: 'Av. Industrial, 1234, Distrito Industrial. Recife, PE', sla_nivel: 'ALTO', stats: '2 veículos' },
    { id: 'C2', nome: 'ACHÊ', contato: 'Lima/Josiane', telefone: '0800472777 / 88120-3525', endereco: 'Rua Farmacêutica, 567, Boa Viagem. Recife, PE', sla_nivel: 'ALTO', stats: '2 veículos' },
    { id: 'C3', nome: 'AMANCO', contato: 'Valéria', telefone: '9086-3850', endereco: 'Av. Principal, 890, Jaboatão. Jaboatão, PE', sla_nivel: 'ALTO', stats: '1 veículo' },
    { id: 'C4', nome: 'AMCOR', contato: 'Ricardo', telefone: '81 8163-722', endereco: 'Rua Embalagens, 234, Cabo. Cabo de Santo Agostinho, PE', sla_nivel: 'ALTO', stats: '2 veículos' },
    { id: 'C5', nome: 'CAMPARI', contato: 'Valéria', telefone: '9086-3387', endereco: 'Av. das Bebidas, 456, Suape. Ipojuca, PE', sla_nivel: 'ALTO', stats: '1 veículo' },
    { id: 'C6', nome: 'CBA', contato: 'Fernanda Lima', telefone: '(81) 3333-6666', endereco: 'Rua Comercial, 789, Centro. Recife, PE', sla_nivel: 'ALTO', stats: '3 veículos' },
    { id: 'C7', nome: 'CONSAG', contato: 'Junior/Kleimardo', telefone: '(81) 98135-2380', endereco: 'Av. Agropecuária, 321, Vitória. Vitória de Santo Antão, PE', sla_nivel: 'ALTO', stats: '1 veículo' },
    { id: 'C8', nome: 'CRISTALPET', contato: 'Telma', telefone: '9913-2208', endereco: 'Rua Plásticos, 654, Igarassu. Igarassu, PE', sla_nivel: 'ALTO', stats: '2 veículos' },
    { id: 'C9', nome: 'DECAL', contato: 'Janaína', telefone: '97090-2273', endereco: 'Av. Decorações, 987, Olinda. Olinda, PE', sla_nivel: 'ALTO', stats: '1 veículo' },
    { id: 'C10', nome: 'HDH', contato: 'Sérgio Ricardo', telefone: '81 9 3019 / 0 88081-2097', endereco: 'Rua Hoteleira, 147, Boa Viagem. Recife, PE', sla_nivel: 'BAIXO', stats: '1 veículo' },
    { id: 'C11', nome: 'HOTEL VIVÁ', contato: 'Juliana', telefone: '98111-5772', endereco: 'Av. Conselheiro Aguiar, 258, Boa Viagem. Recife, PE', sla_nivel: 'ALTO', stats: '2 veículos' },
    { id: 'C12', nome: 'INBETTA', contato: 'Karine', telefone: '90164-5104', endereco: 'Rua Industrial, 369, Paulista. Paulista, PE', sla_nivel: 'MÉDIO', stats: '1 veículo' },
    { id: 'C13', nome: 'JCPM', contato: 'Silvano', telefone: '80497-4203', endereco: 'Av. Empresarial, 741, Recife. Recife, PE', sla_nivel: 'BAIXO', stats: '1 veículo' },
    { id: 'C14', nome: 'JEEP', contato: 'Douglas', telefone: '9090-8387', endereco: 'Av. Automóveis, 852, Jaboatão. Jaboatão, PE', sla_nivel: 'ALTO', stats: '3 veículos' },
    { id: 'C15', nome: 'MARELLI', contato: 'Karlilli Souza', telefone: '(19) 9 6000-3088', endereco: 'Rua Autopeças, 963, Cabo. Cabo de Santo Agostinho, PE', sla_nivel: 'ALTO', stats: '2 veículos' },
    { id: 'C16', nome: 'MASTERFOOD', contato: 'Janildo', telefone: '81 1 06384-8708', endereco: 'Av. Alimentos, 159, Recife. Recife, PE', sla_nivel: 'MÉDIO', stats: '1 veículo' },
    { id: 'C17', nome: 'MERCADO LIVRE', contato: 'Ana Sofia', telefone: '(81) 40028922', endereco: 'Rua São José do Egito, 616, Pau Amarelo. Paulista, PE', sla_nivel: 'BAIXO', stats: '2 veículos' },
    { id: 'C18', nome: 'MONTE RODOVIAS', contato: 'Robson', telefone: '88100-3067', endereco: 'BR-101, Km 45, Igarassu. Igarassu, PE', sla_nivel: 'MÉDIO', stats: '3 veículos' },
    { id: 'C19', nome: 'MOURA', contato: 'Janildo', telefone: '98896-5728', endereco: 'Av. Baterias, 357, Barro. Recife, PE', sla_nivel: 'MÉDIO', stats: '1 veículo' },
    { id: 'C20', nome: 'OMIRP', contato: 'Janaína', telefone: '88783-4138', endereco: 'Rua Química, 468, Suape. Ipojuca, PE', sla_nivel: 'BAIXO', stats: '1 veículo' },
    { id: 'C21', nome: 'PIATEC', contato: 'Karlilli Souza', telefone: '(18) 9 6000-3908', endereco: 'Av. Tecnológica, 579, Recife. Recife, PE', sla_nivel: 'ALTO', stats: '1 veículo' },
    { id: 'C22', nome: 'TECON', contato: 'Gilson', telefone: '88752-2303', endereco: 'Porto de Suape, s/n, Suape. Ipojuca, PE', sla_nivel: 'ALTO', stats: '2 veículos' },
    { id: 'C23', nome: 'TURISMO', contato: 'Luciana', telefone: '88721-2891', endereco: 'Av. Boa Viagem, 4821, Boa Viagem. Recife, PE', sla_nivel: 'MÉDIO', stats: '2 veículos' },
    { id: 'C24', nome: 'VILA GALÉ', contato: 'Juliana', telefone: '90015-7458', endereco: 'Av. Atlântica, 123, Cabo. Cabo de Santo Agostinho, PE', sla_nivel: 'MÉDIO', stats: '2 veículos' },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const clientesFiltrados = clientes.filter(cliente => 
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.contato.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar Superior */}
      <header className="bg-red-600 p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-4">
          <Menu className="text-white cursor-pointer" />
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar ocorrências, clientes, veículos..." 
              className="w-96 p-2 pl-4 rounded-md focus:outline-none text-sm"
            />
          </div>
        </div>
        <div className="bg-white/20 p-2 rounded-full cursor-pointer">
          <User className="text-white" size={20} />
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        {/* Botão Voltar */}
        <button 
          onClick={() => navigate('/')}
          className="mb-4 text-gray-700 hover:text-black transition"
        >
          <ArrowLeft size={28} />
        </button>

        {/* Cabeçalho da Página */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Gestão de Clientes</h1>
          <p className="text-gray-500 text-sm mt-1">
            Gerencie usuários, notificações, templates e preferências do sistema
          </p>
        </div>

        {/* Barra de Busca e Filtros */}
        <div className="flex gap-2 mb-6">
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Buscar por cliente, telefone ou contato..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>
          <button className="bg-white border border-gray-300 px-6 py-2 rounded-lg flex items-center gap-2 shadow-sm text-gray-600 font-semibold hover:bg-gray-50 transition">
            <Filter size={18} /> Filtros
          </button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-lg"><Users size={20} className="text-gray-700" /></div>
            <div>
              <p className="text-xs font-bold text-gray-800">{clientes.length}</p>
              <p className="text-[10px] text-gray-500 uppercase">Total de clientes</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-lg"><MapPin size={20} className="text-gray-700" /></div>
            <div>
              <p className="text-xs font-bold text-gray-800">8</p>
              <p className="text-[10px] text-gray-500 uppercase">Cidades Atendidas</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-lg"><Clock size={20} className="text-gray-700" /></div>
            <div>
              <p className="text-xs font-bold text-gray-800">{clientes.reduce((acc, c) => acc + parseInt(c.stats.split(' ')[0]), 0)}</p>
              <p className="text-[10px] text-gray-500 uppercase">Total de Veículos</p>
            </div>
          </div>
        </div>

        {/* Tabela de Clientes */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-gray-600 text-[11px] font-bold uppercase tracking-wider">
                <th className="p-4">Cliente</th>
                <th className="p-4">Contato</th>
                <th className="p-4">Telefone</th>
                <th className="p-4">Endereço</th>
                <th className="p-4">Nível de Exigência</th>
                <th className="p-4">Estatísticas</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clientesFiltrados.map((cliente, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div 
                      className="text-sm font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition"
                      onClick={() => navigate(`/clientes/${cliente.id}`)}
                      title="Ver perfil do cliente"
                    >
                      {cliente.nome}
                    </div>
                    <div className="text-[10px] text-gray-500 uppercase font-semibold">ID: {cliente.id}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-700">{cliente.contato}</td>
                  <td className="p-4 text-sm text-gray-700">{cliente.telefone}</td>
                  <td className="p-4 text-[11px] text-gray-600 max-w-[200px] leading-tight">
                    {cliente.endereco}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      cliente.sla_nivel === 'ALTO' ? 'bg-red-100 text-red-700' :
                      cliente.sla_nivel === 'MÉDIO' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {cliente.sla_nivel}
                    </span>
                  </td>
                  <td className="p-4 text-[11px] text-gray-700 font-medium">
                    {cliente.stats}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-3 text-gray-500">
                      <Eye 
                        size={18} 
                        className="cursor-pointer hover:text-blue-600 transition" 
                        onClick={() => navigate(`/clientes/${cliente.id}`)}
                        title="Ver detalhes"
                      />
                      <Edit 
                        size={18} 
                        className="cursor-pointer hover:text-green-600 transition" 
                        onClick={() => navigate(`/clientes/editar/${cliente.id}`)}
                        title="Editar cliente"
                      />
                      <Trash2 
                        size={18} 
                        className="cursor-pointer hover:text-red-600 transition" 
                        title="Excluir cliente"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default GestaoClientes;
